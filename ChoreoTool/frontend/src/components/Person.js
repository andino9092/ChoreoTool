import React, {useState, useEffect} from "react";
import { Circle } from "react-konva";

export default function Person(props){
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);
    const [hover, toggleHover] = useState(false);


    const handleHover = () => {
        toggleHover(!hover);
    }
    
    return(
            <Circle 
                draggable 
                radius={10} 
                fill="green" 
                x={200} y={200} 
                strokeWidth={hover ? 2: 0}
                stroke="black"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                
                >
                
            </Circle>
        
        
    )
}