import React, {useState, useEffect} from "react";


export default function Person(props){
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);


    return(
        <div>
            {x} , {y}
        </div>
    )
}