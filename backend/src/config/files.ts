// import { FileFilterCallback } from "multer";

// import multer from "multer";
import fileTypes from "../constants/fileTypes.ts";
import path from "path";
import { Request } from "express";

// import { Request } from 'express'
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const upload = multer({
    limits: {
        fileSize: 536870912,
    },
    storage: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
            if (file) {
                callback(null, "./server");
            } else {
                if (req.file) {
                    console.log("No file was found");
                    callback(new Error("No file was found"), "");
                }
            }
        },
        filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
            // console.log(file);
            if (file) {
                // req.body.file = file;
                // req.body.file.name = Date.now() + "_" + file.originalname;
                callback(null, Date.now() + "_" + file.originalname);
            } else {
                console.log("No file was found");
                callback(new Error("No file was found"), "");
            }
        },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        if (file) {
            const extension = path.extname(file.originalname);
            if (fileTypes.includes(extension)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        } else {
            callback(null, false);
        }
    },
});

export default upload;
