import React, { useEffect, useRef, useImperativeHandle, useCallback} from "react";
import {Spring, useSpring, animated} from "@react-spring/konva"
import { useState, forwardRef} from "react";
import { Circle, Text, Group} from "react-konva";

const Person = forwardRef((props, ref) => {
    const [id, setId] = useState(props.id);
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);
    const [hover, toggleHover] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [flag, setFlag] = useState(false);
    const pRef = useRef();

    const handleHover = () => {
        toggleHover(!hover);
    }
    
    return(
      <Group>
        <Text opacity={props.showName ? 1 : 0} text={props.name} x={x} y={y-10}/>
        <Circle 
            draggable={props.draggable}
            ref={ref}
            radius={props.size} 
            fill="green" 
            x={x} y={y} 
            strokeWidth={hover ? 2: 0}
            stroke="black"
            onMouseEnter={props.hovering ? handleHover: ""}
            onMouseLeave={props.hovering ? handleHover: ""}
            onDragStart={() => {
                setIsDragging(true);
              }}
            onDragEnd={e => {
                setIsDragging(false);
                props.onDrag(id, e.target.x(), e.target.y());
                console.log(x, y);
              }}
            >
        </Circle>
      </Group>
       
    )
})

export default Person;

  
//   render(){
//     return(
//       <Spring
//         from={{
//           x: 0,
//         }}
//         to={{
//             x: this.state.flag ? this.state.x : 100,
//             fill: this.state.flag ? "green" : "blue",
//         }}>
//         {props => {
//             return <animated.Circle 
//               // draggable 
//               radius={10} 
//               y={50}
//               strokeWidth={this.state.hover ? 2: 0}
//               stroke="black"
//               onMouseEnter={this.handleHover}
//               onMouseLeave={this.handleHover}
//               // onDragStart={() => {
//               //     this.setState({isDragging: true});
//               //   }}
//               // onDragEnd={e => {
//               //     this.setState({isDragging: false});
//               //   }}
//               onClick={this.handleClick}
//             />
//         }}
//         {/* <animated.Circle 
//             draggable 
//             radius={10} 
//             fill="green" 
//             x={this.state.x} y={this.state.y} 
//             strokeWidth={this.state.hover ? 2: 0}
//             stroke="black"
//             onMouseEnter={handleHover}
//             onMouseLeave={handleHover}
//             onDragStart={() => {
//                 setIsDragging(true);
//               }}
//             onDragEnd={e => {
//                 setIsDragging(false);
//                 this.state.onDrag(this.state.id, e.target.x(), e.target.y());
//                 tryMove();
//               }}
//             /> */}
//       </Spring>
      
//     )
//   }
// }

// // const [id, setId] = useState(props.id);
// //     const [x, setX] = useState(props.x);
// //     const [y, setY] = useState(props.y);
// //     const [hover, toggleHover] = useState(false);
// //     const [isDragging, setIsDragging] = useState(false);

// //     var move = useRef();

// //     const tryMove = () => {
// //       move.to(
// //         {
// //           scaleX: Math.random() + 0.8,
// //           scaleY: Math.random() + 0.8,
// //           duration: 0.2
// //         }
// //       )
// //     }

// //     const handleHover = () => {
// //         toggleHover(!hover);
// //     }

// //     return(
// //             <Circle 
// //                 draggable 
// //                 ref={move}
// //                 radius={10} 
// //                 fill="green" 
// //                 x={props.x} y={props.y} 
// //                 strokeWidth={hover ? 2: 0}
// //                 stroke="black"
// //                 onMouseEnter={handleHover}
// //                 onMouseLeave={handleHover}
// //                 onDragStart={() => {
// //                     setIsDragging(true);
// //                   }}
// //                 onDragEnd={e => {
// //                     setIsDragging(false);
// //                     props.onDrag(id, e.target.x(), e.target.y());
// //                     tryMove();
// //                   }}
// //                 >
                
// //             </Circle>
        
        
// //     )