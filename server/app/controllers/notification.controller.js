import Notification from "../model/notification.model.js";

export const getAllNotification = async (req, res) => {
  const data =  await  Notification.find().sort("-createdAt");
   res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: data
    });
};