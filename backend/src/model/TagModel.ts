import { Schema, model } from "mongoose";
import { ITag } from "../interfaces/common";

const tagSchema = new Schema<ITag>({
    name: { type: String, required: true },
});

const TagModel = model<ITag>("Tag", tagSchema);

export default TagModel;
