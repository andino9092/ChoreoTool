import React from "react";
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

    const renderCurrPage = () => {

        if (props.type == "SelectFormation"){

            return (
                <TransitionGroup>
                    {props.formations.map((n, i) => {
                        return (
                        <CSSTransition timeout={500} key={i} classNames="name">
                            <SelectFormation divider={i != props.formations.length -1} id={n['id']} formations={n['formations']} title={n['title']}/>
                        </CSSTransition>
                    )})}
                </TransitionGroup>
            )
        }
        return (
            <TransitionGroup>
                {Array(props.numppl).fill().map((n, i) => (
                    <CSSTransition timeout={500} key={i} classNames="name">
                        <StyledTextForm placeholder="Name" my={2} mx={1} variant="standard" size="1" key={i}/>
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