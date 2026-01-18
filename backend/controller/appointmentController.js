import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, {
  errorMiddleware,
} from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { Appointment } from "../models/appointmentSchema.js";

// To send Appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    gender,
    dob,
    nic,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    address,
    hasVisited,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !gender ||
    !dob ||
    !nic ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    doctorDepartment: department,
    role: "Doctor",
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found !", 400));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor Conflict Please Contact Through Email or Phone!",
        404
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  // console.log(req);

  const appointment = await Appointment.create({
    firstName,
    lastName,
    phone,
    email,
    gender,
    dob,
    nic,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    address,
    hasVisited,
    doctorId,
    patientId,
  });

  res.status(200).json({ success: true, message: "Appointment Send Successfully!",appointment });
});

// Get all appointments
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({ success: true, appointments });
});


// Update Appointment
export const updateAppointmentStatus = catchAsyncErrors( async (req, res, next) =>{
    const { id } = req.params;
    let appointment = Appointment.findById(id);

    // console.log(appointment)
    if(!appointment) {
        return next(new ErrorHandler('Appointment Not Found!', 404));
    };

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    } );
    

    res.status(200).json({success: true, message:'Appointment Status Updated', appointment});
});

// Delete Appointment
export const deleteAppointment = catchAsyncErrors( async(req, res, next) => {
    const { id } = req.params;
    // console.log(id);
    const appointment = await Appointment.findById(id);
    if(!appointment) {
        return next( new ErrorHandler('Appointment Not Found', 404));
    };

    await appointment.deleteOne();
    res.status(200).json({success: true, message: 'Appointment Deleted!'});
});