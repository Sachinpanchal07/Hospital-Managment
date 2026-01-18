import Biography from "../components/Biography.jsx";
import Departments from "../components/Departments.jsx";
import Hero from "../components/Hero.jsx";
import MessageForm from "../components/MessageFrom.jsx";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to ZeeCare Medical Institue | Your Trusted HealthCare Provider"
        }
        imageUrl={"/hero.png"}
      ></Hero>
      <Biography imageUrl={"/about.png"}></Biography>
      <Departments></Departments>
      <MessageForm></MessageForm>
    </>
  );
};

export default Home;
