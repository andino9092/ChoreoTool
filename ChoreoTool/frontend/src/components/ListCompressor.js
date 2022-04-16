import React, { useEffect } from "react";
import { useState } from "react";
import SelectFormation from "./SelectFormation";
import StyledTextForm from "./StyledTextForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function ListCompressor(props){


    /**
     * formations.map((n, i) => {
        return (
            <SelectFormation key={i} divider={i != formations.length -1} id={n['id']} formations={n['formations']} title={n['title']}/>
        )
     */

    /**
     * Array(numppl).fill().map((n, i) => 
            <StyledTextForm placeholder="Name" my={2} mx={1} variant="standard" size="1" key={i}/>
        )
     */

    const [names, setNames] = useState([]);
    const [prevNames, setPrevNames] = useState([]);

    useEffect(() => {
        if (props.numppl < names.length || props.numppl == 0){
            setPrevNames([...names].map((n, i) => {
                return prevNames[i] && !n? prevNames[i] : n;
            }));
            setNames(Array(props.numppl).fill())
        }
        else if (props.numppl > 0 && props.numppl > names.length){
            console.log("hello")
            setNames(prevNames.concat(Array(props.numppl - prevNames.length)));
        }
        else{
            console.log("herro");
            setNames(Array(props.numppl).fill())
        }
        
    }, [props.numppl])

    useEffect(() => {
        console.log(names)
        console.log(prevNames);
    })

    const renderCurrPage = () => {

        if (props.type == "SelectFormation"){
            return (
                <TransitionGroup>
                    {props.formations.map((n, i) => {
                        return (
                        <CSSTransition timeout={500} key={i} classNames="name">
                            <SelectFormation 
                                divider={i != props.formations.length -1} 
                                id={n['id']} 
                                formations={n['formations']} 
                                title={n['title']}
                            />
                        </CSSTransition>
                    )})}
                </TransitionGroup>
            )
        }
        return (
            <TransitionGroup>
                {names.map((n, i) => (
                    <CSSTransition timeout={500} key={i} classNames="name">
                        <StyledTextForm onChange={(e) => setNames([...names].map((value, index) => index == i ? e.target.value : value))} value={names[i] ? names[i] : ""}  placeholder="Name" my={2} mx={1} variant="standard" size="1" key={i}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
    )
    }

    return(
        <div>
            {renderCurrPage()}
        </div>
    )
}