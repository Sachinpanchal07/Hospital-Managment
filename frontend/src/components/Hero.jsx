const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          accusamus ab reiciendis mollitia earum, quasi unde dignissimos
          laudantium et voluptates, nihil quam sequi magnam! Sequi, voluptatum
          et laboriosam minima voluptatibus cum veritatis.
        </p>
      </div>

      <div className="banner">
        <img src={imageUrl} alt="hero-img" className="animated-image"></img>
        <span>
            <img src="/Vector.png" alt="vector-img"></img>
        </span>
      </div>
    </div>
  );
};

export default Hero;
