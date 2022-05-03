import React, { useEffect, useRef, useImperativeHandle, useCallback} from "react";
import {Spring, useSpring, animated} from "@react-spring/konva"
import { useState, forwardRef} from "react";
import { Circle, Text, Group} from "react-konva";

const Person = forwardRef((props, ref) => {
    const [hover, toggleHover] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);

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
            var f = props.onDrag(props.id, e.target.x(), e.target.y());
            props.onDragHelp(props.id, f[0], f[1]);
          }}
          x={x} 
          y={y} 
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
            onClick={() => props.handleFocus(props.name, x, y, props.id)}
            >
        </Circle>
      </Group>
       
    )
})

export default Person;