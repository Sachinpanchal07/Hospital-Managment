
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {

    return(
       <>
            <Hero title={'Learn More About Us | ZeeCare Madical Institute'} imageUrl={'/about.png'}>

            </Hero>
            <Biography imageUrl={'/whoweare.png'}></Biography>
       </>
    )
};

export default AboutUs