import { height } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"

export default function Canvas(props){

    const [personHover, setHover] = useState(false);
    const [numPeople, setPeople] = useState(0);

    const canvasRef = useRef();
    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = 1000;
    const cHeight = 600;
    
    
    const stage = {
        backgroundColor: "#2e2c2c",
        borderWidth: '2px',
        margin: '0 auto',
        display: 'block',
    }

    const person = {
        height: "20px",
        width: "20px",
        display: "inline-block",
        borderRadius: "50%",
        backgroundColor: "rgb(0, 153, 235)",
        border: personHover ? "2px solid black" : "",
    }

    const draw = ctx =>{
        for (var i = 0; i <= 8; i++){
            ctx.beginPath();
            ctx.moveTo(cWidth / horizontalSections * i, 0);
            ctx.lineTo(cWidth/ horizontalSections * i, cHeight);
            ctx.stroke();
        }
        for (var i = 0; i <= 5; i++){
            ctx.beginPath();
            ctx.moveTo(0, cHeight/ verticalSections * i);
            ctx.lineTo(cWidth, cHeight/ verticalSections * i);
            ctx.stroke();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = cWidth;
        canvas.height = cHeight;
        context.fillStyle = '#black'

        draw(context);
    }, [draw])

    const createPerson = () => {
        setPeople(numPeople + 1);
        console.log(numPeople);
    }

    const handleHover = () => {
        setHover(!personHover)
    }

    const renderPeople = () => {
        console.log("rendered");
        return [...Array(numPeople)].map((n) => <Draggable>
            <div style={person}></div>
        </Draggable>)
    }

    const people = renderPeople();

    return (
        <div>
            <h1 style={{display: "block", margin:"0 auto", textAlign:"center"}}>Title</h1>
            <Draggable onStart={() => false}>
                    <div style={person} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={createPerson}></div>
            </Draggable>
            {people}
            <canvas ref={canvasRef} style={stage}>
                
            </canvas>
        </div>
    )
}