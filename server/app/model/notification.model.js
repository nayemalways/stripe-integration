import { model, Schema } from "mongoose";


const notificatinSchema = new Schema({
    productId: String,
    title: String,
    description: String
}, {
    versionKey: false,
    timestamps: true
});


const Notification = model("notification", notificatinSchema);

export default Notification;