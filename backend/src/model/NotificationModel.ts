import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface INotification {
    user: { userId: Types.ObjectId; role: string };
    message: string;
    isRead: boolean;
    createdAt: Date;
}

export type INotificationModel = Model<INotification>;

const notificationSchema = new Schema<INotification>({
    user: {
        type: {
            userId: mongoose.Schema.Types.ObjectId,
            role: String,
        },
        required: true,
        _id: false,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const NotificationModel: INotificationModel = mongoose.model<INotification>("Notification", notificationSchema);

export default NotificationModel;
