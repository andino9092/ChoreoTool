import React, {useState} from "react";
import Slider from "react-slick";
import Preview from "./Preview";

export default function ResponsiveSlider(props){


    return(
        <div>
        <Slider className="responsiveSlider" dots={true}>
          {props.formations.map(n => (
            <div>
              <h1 style={{alignItems:"center", justifyContent:"center", display:"flex", color:"white"}}>{n['title']}</h1>
              <h1 style={{color:"green"}}>
                <Preview formations={n['formations']}/>
              </h1>
            </div>
          ))}
        </Slider>
      </div>
    )
}