import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero title={'Schedule Your Appointment | ZeeCare Madical Institue'} imageUrl={'/signin.png'}></Hero>
      <AppointmentForm></AppointmentForm>
    </>
  );
};

export default Appointment;
