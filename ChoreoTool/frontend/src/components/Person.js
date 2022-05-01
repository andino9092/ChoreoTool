import React, { useEffect, useRef, useImperativeHandle, useCallback} from "react";
import {Spring, useSpring, animated} from "@react-spring/konva"
import { useState, forwardRef} from "react";
import { Circle, Text, Group} from "react-konva";

const Person = forwardRef((props, ref) => {
    const [hover, toggleHover] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleHover = () => {
        toggleHover(!hover);
    }

    return(
      <Group 
          draggable
          onDragStart={() => {
            setIsDragging(true);
          }}
          onDragEnd={e => {
            setIsDragging(false);
            props.onDrag(props.id, e.target.x(), e.target.y());
          }}
          x={props.x} 
          y={props.y} 
          ref={ref}
        >
        <Text opacity={props.showName ? 1 : 0} text={props.name} y={20} align="center" />
        <Circle 
            radius={props.size} 
            fill="green" 
            strokeWidth={hover ? 2: 0}
            stroke="black"
            onMouseEnter={props.hovering ? handleHover: ""}
            onMouseLeave={props.hovering ? handleHover: ""}
            >
        </Circle>
      </Group>
       
    )
})

export default Person;