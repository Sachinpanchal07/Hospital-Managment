import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";



// Send Message
export const sendMessage = catchAsyncErrors( async (req, res, next) => {
    const {firstName, lastName, phone, email, message} = req.body;

    if(!firstName || !lastName || !phone || !email || !message ) {
        return next(new ErrorHandler('Please fill complete details !', 400));
    };
    // console.log(firstName, lastName, phone, email, message)
    await Message.create({firstName, lastName, phone, email, message});
    return res.status(200).json({success: true, message: 'Message Send Successfully'});
});

// Get all message by admin
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({success: true, messages});
});

// delete message
export const delteMessage = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const response = await Message.findByIdAndDelete(id);
    res.status(200).json({sucess: true, message: 'Message Deleted Successfully'});
})
