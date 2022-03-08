import { Spring, animated } from "@react-spring/konva"
import { useState } from "react"
import Person from "./Person"
import React from "react"

export default class AnimatedPerson extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nextX: props.nextX,
            nextY: props.nextY,
        }
    }

    render(){
        return(
            <Spring
                native
                from={{
                    x: 0,
                    y: 0,
                }}
                to={{
                    x: this.state.nextX,
                    y: this.state.nextY,
                }}
            >
                {props => {
                    console.log("render");
                    return <animated.Ci {...props}/>
                }}
            </Spring>
        )
    }
}