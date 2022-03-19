import React from "react";
import Slider from "react-slick";

export default function ResponsiveSlider(props){

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    const loadPreview = () => {
        return props.formations.map(n => {
            <div>
                <h1>
                    1
                </h1>
            </div>
        })
    }
    const preview = loadPreview();

    return(
        <div>
        <h2> Responsive </h2>
        <Slider {...settings}>
            {preview}
        </Slider>
      </div>
    )
}