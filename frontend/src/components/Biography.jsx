
const Biography = ({imageUrl}) => {

    return (
        <div className="container biography">
            <div className="banner"> 
                <img src={imageUrl} alt="aboutImg"></img>
            </div>
            <div className="banner">

            <p>Biography</p>
            <h3>Who We Are</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, excepturi. Fugiat expedita labore cumque ad autem provident similique, alias deserunt sapiente dolor, quisquam perspiciatis, totam itaque praesentium dolorum reiciendis. Voluptatibus officiis veniam laborum nam soluta ipsam quae, adipisci aspernatur quidem sit quod obcaecati ea fugit vero autem eum! Delectus, quisquam!</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam tenetur molestiae beatae dolores veritatis vitae cum veniam cumque magni consequatur.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ab odit officia.</p>
            <p>Lorem, ipsum dolor.</p>
            </div>

        </div>
    )
};

export default Biography;