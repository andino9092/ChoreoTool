import React, { useEffect } from "react";
import { useState } from "react";
import SelectFormation from "./SelectFormation";
import StyledTextForm from "./StyledTextForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function ListCompressor(props){

    const [names, setNames] = useState(Array(props.numppl).fill(""));

    useEffect(() => {
        setNames(Array(props.numppl).fill(""));
    }, [props.numppl])

    useEffect(() => {
        console.log(names)
    })

    useEffect(() => {
        if (props.handleNames){
            props.handleNames(names);
        }
    }, [names])

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
                        <StyledTextForm onChange={(e) => {
                                setNames([...names].map((value, index) => {
                                    return index == i ? e.target.value : value
                                }))}
                            }
                            value={n}  
                            placeholder="Name" 
                            my={2} 
                            mx={1} 
                            variant="standard" 
                            size="1" 
                            key={i}/>
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