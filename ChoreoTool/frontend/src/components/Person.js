import React, {useState, useEffect} from "react";
import { Circle } from "react-konva";

export default function Person(props){
    const [id, setId] = useState(props.id);
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);
    const [hover, toggleHover] = useState(false);
    const [isDragging, setIsDragging] = useState(false);


    const handleHover = () => {
        toggleHover(!hover);
    }

    return(
            <Circle 
                draggable 
                radius={10} 
                fill="green" 
                x={props.x} y={props.y} 
                strokeWidth={hover ? 2: 0}
                stroke="black"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                onDragStart={() => {
                    setIsDragging(true);
                  }}
                onDragEnd={e => {
                    setIsDragging(false);
                    props.onDrag(id, e.target.x(), e.target.y());
                  }}
                >
                
            </Circle>
        
        
    )
}