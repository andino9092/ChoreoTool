import React from "react";
import Slider from "react-slick";
import "./Slider.css"

export default function ResponsiveSlider(props){

    return(
        <div>
        <h2> Responsive </h2>
        <Slider dots={true} color="white">
          {props.formations.map(n => (
        <h1>
          {n['formations']}
        </h1>
      ))}
        </Slider>
      </div>
    )
}