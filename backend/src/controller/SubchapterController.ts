import { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes.ts";
import sendResponse, { checkValidation, removeFile } from "../util/common.ts";
import fs from "fs";
import path from "path";
import CourseModel from "../model/CourseModel.ts";
import SubchapterModel from "../model/SubchapterModel.ts";
import ChapterModel from "../model/ChapterModel.ts";
import mongoose from "mongoose";

// import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

class Subchapter {
  async getAll(req: Request, res: Response) {
    try {
      //
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      //
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async add(req: Request, res: Response) {
    try {
      const { title, text, description, instructors, course, chapter } =
        req.body;

      const files = req.files as Array<Express.Multer.File>;

      const fileCount = {
        video: 0,
        image: 0,
        pdf: 0,
        powerpoint: 0,
        zip: 0,
      };

      const filePaths: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        destination: string;
        filename: string;
        path: string;
        size: number;
        type: string;
      }[] = [];

      files.map((file) => {
        switch (file.mimetype) {
          case "video/x-msvideo":
          case "video/mp4":
          case "video/mpeg":
          case "video/ogg":
          case "video/mp2t":
          case "video/webm":
          case "video/3gpp":
          case "video/3gpp2": {
            // console.log("video");
            filePaths.push({ ...file, type: "video" });
            fileCount.video++;
            break;
          }
          case "image/avif":
          case "image/bmp":
          case "image/gif":
          case "image/vnd.microsoft.icon":
          case "image/jpeg":
          case "image/png":
          case "image/svg+xml":
          case "image/tiff":
          case "image/webp": {
            // console.log("image");
            filePaths.push({ ...file, type: "image" });
            fileCount.image++;
            break;
          }
          case "application/zip":
          case "application/x-7z-compressed": {
            // console.log("compressed");
            filePaths.push({ ...file, type: "compressed" });
            fileCount.zip++;
            break;
          }
          case "application/pdf": {
            // console.log("pdf");
            filePaths.push({ ...file, type: "pdf" });
            fileCount.pdf++;
            break;
          }
          case "application/vnd.ms-powerpoint":
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
            // console.log("presentation");
            filePaths.push({ ...file, type: "presentation" });
            fileCount.powerpoint++;
            break;
          }
          default: {
            // console.log("first");
            return sendResponse(
              res,
              HTTP_STATUS.UNPROCESSABLE_ENTITY,
              "Unexpected file received!"
            );
          }
        }
      });

      if (
        fileCount.image > 1 ||
        fileCount.pdf > 1 ||
        fileCount.powerpoint > 1 ||
        fileCount.video > 1 ||
        fileCount.zip > 1
      ) {
        filePaths.map((element) => {
          removeFile([element.filename]);
        });
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Files were not sent wrongly"
        );
      }

      const parentCourse = await CourseModel.findOne({
        _id: new mongoose.Types.ObjectId(course),
        chapters: new mongoose.Types.ObjectId(chapter),
      });

      if (!parentCourse) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Course or chapter does not exist"
        );
      }

      const subChapter = new SubchapterModel();

      filePaths.map((element) => {
        // if (element.type === "video") {
        // console.log(course.title);
        fs.mkdirSync(
          path.join(
            path.resolve(path.dirname("")),
            "server",
            parentCourse.title,
            "content"
          ),
          {
            recursive: true,
          }
        );
        fs.rename(
          path.join(path.resolve(path.dirname("")), "server", element.filename),
          path.join(
            path.resolve(path.dirname("")),
            "server",
            parentCourse.title,
            "content",
            element.filename
          ),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );

        if (element.type === "video") {
          subChapter.video = path.join(
            "/",
            parentCourse.title,
            "content",
            element.filename
          );
        } else if (element.type === "image") {
          subChapter.image = path.join(
            "/",
            parentCourse.title,
            "content",
            element.filename
          );
        } else if (element.type === "compressed") {
          subChapter.compressed = path.join(
            "/",
            parentCourse.title,
            "content",
            element.filename
          );
        } else if (element.type === "pdf") {
          subChapter.pdf = path.join(
            "/",
            parentCourse.title,
            "content",
            element.filename
          );
        } else if (element.type === "presentation") {
          subChapter.presentation = path.join(
            "/",
            parentCourse.title,
            "content",
            element.filename
          );
        }
        // }
      });

      // console.log(subChapter);

      const parentChapter = await ChapterModel.findById({
        _id: new mongoose.Types.ObjectId(chapter),
      }).populate({
        path: "subChapters",
        match: { title: title },
      });

      if (
        parentChapter &&
        parentChapter.subChapters &&
        parentChapter.subChapters.length > 0
      ) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Subchapter already exists"
        );
      }

      await ChapterModel.updateOne(
        { _id: chapter },
        { $addToSet: { subChapters: subChapter._id } }
      );

      subChapter.title = title;
      subChapter.description = description;

      //   adding to s3
      const bucketName = process.env.BUCKET_NAME;
      const region = process.env.BUCKET_REGION;
      const accessKeyId = process.env.ACCESS_KEY;
      const secretAccessKey = process.env.SECRET_ACCESS_KEY;

      console.log("bucketName", bucketName);
      console.log("region", region);
      console.log("accessKeyId", accessKeyId);
      console.log("secretAccessKey", secretAccessKey);

      if (accessKeyId && secretAccessKey) {
        // Create the S3ClientConfig with the correct structure
        // const s3ClientConfig: S3ClientConfig = {
        //   credentials: {
        //     accessKeyId: accessKeyId,
        //     secretAccessKey: secretAccessKey,
        //   },
        //   region,
        // };
        // const s3Client = new S3Client(s3ClientConfig);

        console.log("Bucket", bucketName);
        console.log("Key", req.file?.originalname);
        console.log("Body", req.file?.buffer);
        console.log("ContentType", req.file?.mimetype);
        console.log("files", files);

        // Upload each file to S3
        const uploadPromises = files.map(async (file) => {
          const currentFilePath = new URL(import.meta.url);
          const currentDirPath = path.dirname(currentFilePath.pathname);
          const filePath = path.join(
            // currentDirPath,
            `server/${parentCourse.title}/content`,
            file.filename
          );
          console.log("filePath", filePath);

          const sampleFilePath =
            "server/React JS - Basics to Advanced/content/1701049270296_Demo Background Sample Video.mp4";

          console.log("sampleFilePath", sampleFilePath);

          const fileContent = fs.readFileSync(filePath);
          const fileContent1 = fs.readFileSync(sampleFilePath);
          console.log("Bucket", bucketName);
          console.log("originalname", file.originalname);
          console.log("Body buffer", file.buffer);
          console.log("Body buffer", fileContent);
          console.log("ContentType mimetype", file.mimetype);
          const params = {
            Bucket: bucketName,
            Key: file.originalname,
            // Body: file.buffer,
            Body: fileContent,
            ContentType: file.mimetype,
          };

          // const command = new PutObjectCommand(params);

          // await s3Client.send(command);
        });

        await Promise.all(uploadPromises);

        // const params = {
        //   Bucket: bucketName,
        //   Key: req.file?.originalname,
        //   Body: req.file?.buffer,
        //   ContentType: req.file?.mimetype,
        // };

        // const command = new PutObjectCommand(params);

        // await s3Client.send(command);
      }

      await subChapter.save();

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Successfully added subchapter",
        subChapter
      );
      // }
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async update(req: Request, res: Response) {
    try {
      //
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async delete(req: Request, res: Response) {
    try {
      //
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async getVideo(req: Request, res: Response) {
    const course = await SubchapterModel.findOne({
      _id: new mongoose.Types.ObjectId("6558568681f57879e08fa3e1"),
    });
    if (course && course.video) {
      const range = req.headers.range;
      if (!range) {
        res.status(400).send("Requires Range header");
      }

      const videoPath =
        "server\\React JS - Basic to Advanced\\content\\1700288134716_Recording 2023-11-12 122257.mp4";
      const videoSize = fs.statSync(
        "server\\React JS - Basic to Advanced\\content\\1700288134716_Recording 2023-11-12 122257.mp4"
      ).size;

      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range?.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      // Create headers
      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // create video read stream for this particular chunk
      const videoStream = fs.createReadStream(videoPath, { start, end });

      // Stream the video chunk to the client
      videoStream.pipe(res);
      // console.log(path.join("server", course?.video))
      // res.setHeader('Content-Type', 'video/mp4');
      // return res.sendFile(path.join("server", course?.video), {root: "."});
    }
    // return sendResponse(res, HTTP_STATUS.OK, "Got video url", course);
  }
}

export default new Subchapter();
