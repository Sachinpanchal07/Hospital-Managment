import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import { User } from '../models/userSchema.js';
import {generateToken} from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

// Register new user
export const patientRegister = catchAsyncErrors( async (req, res, next) => {
    const {firstName, lastName, phone, email, password, gender, dob, nic, role} = req.body;
    
    if(!firstName || !lastName || !phone || !email || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler('please fill all details', 400));
    };
    let user = await User.findOne({ email });
    if(user) {
        return next(new ErrorHandler('User already Registered', 400));
    };
    user = await User.create({ firstName, lastName, phone, email, password, gender, dob, nic, role });
    generateToken(user, 'User Registered successfully!', 200, res);
});

// login user
export const login = catchAsyncErrors( async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if( !email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler('Please fill all details', 400)); // pass the error to error_handling_middleware
    };

    if (password !== confirmPassword) {
        return next(new ErrorHandler('Password and confirm password do not match!'));
    };
    
    const user = await User.findOne({email}).select('+password');  // check user schema for +password
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password'));
    };

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next( new ErrorHandler('Invalid Email or Password'));
    };

    if(role != user.role) {
        return next( new ErrorHandler('User with this role not found'));
    };
    
    // console.log(user)
    generateToken(user, 'User logged in successfully!', 200, res);
});

// Register new admin

export const addNewAdmin = catchAsyncErrors( async (req, res, next) => {
    const {firstName, lastName, phone, email, password, gender, dob, nic} = req.body;

    if(!firstName || !lastName || !phone || !email || !password || !gender || !dob || !nic){
        return next(new ErrorHandler('Please fill all details', 400));
    };

    const isRegistered = await User.findOne({ email });
    if(isRegistered){
        return next( new ErrorHandler(`${isRegistered.role} with this email already registered`, 400));
    };

    const admin = await User.create( {firstName, lastName, phone, email, password, gender, dob, nic, role: 'Admin'});
    // console.log(admin);
    res.status(200).json({success: true, message: 'New Admin registered'});
});

// Get all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({role: 'Doctor'});
    res.status(200).json({success: true, doctors});
});

// Get user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({success: true, user});
});

// Admin Logout controller
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie('adminToken', '', { httpOnly: true, expires: new Date(Date.now()) })
    .json({success:true, message:'Admin Logged Out successfully'});
});

// Patient logout controller
export const logoutpatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie('patientToken', '', { httpOnly: true, expires: new Date(Date.now()) })
    .json({success:true, message:'Patient Logged Out successfully'});
});

// Add new doctor 
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log(req.files);  // console image
        return next(new ErrorHandler('Doctor Avatar Required!', 400 ));
    };
    const { docAvatar } = req.files; // docAvatar name must same as in client-side
    const allwedFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!docAvatar || !allwedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler('File Format Not Supported', 400));
    };
    
    const {firstName, lastName, phone, email, password, gender, dob, nic, doctorDepartment} = req.body;
    if (!firstName || !lastName || !phone || !email || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler('Please Provide all details', 400));
    };

    const isRegistered = await User.findOne({email});
    if (isRegistered){
        return next( new ErrorHandler(`${isRegistered.role} already registered with this email`,400));
    };

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath); // upload image on cloudinary
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error('Cloudinary Error:', cloudinaryResponse.error || 'Unknown Cloudinary Error');
    };
    const doctor = await User.create({ 
        firstName,
        lastName,
        phone, 
        email, 
        password, 
        gender, 
        dob, 
        nic, 
        doctorDepartment,
        role: 'Doctor',
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
          }
         });

    return res.status(200).json({success:true, message: 'New Doctor Registered', doctor});

})