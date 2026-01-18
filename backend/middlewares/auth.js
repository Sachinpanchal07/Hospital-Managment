import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";


// For Admin athentication and athorization
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin  Not Athenticated", 400));
  };
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   console.log(decoded);
  
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} is not Atherized for this role`, 403));
  };
  next();
});

// For Patient athentication and athorization
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("Patient  Not Athenticated", 400));
    };
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(new ErrorHandler(`${req.user.role} is not Atherized for this role`, 403));
    };
    next();
  });