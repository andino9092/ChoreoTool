import React from "react";
import { useState } from "react";
import SelectFormation from "./SelectFormation";
import StyledTextForm from "./StyledTextForm";

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
            return props.formations.map((n, i) => {
                return (
                    <SelectFormation key={i} divider={i != props.formations.length -1} id={n['id']} formations={n['formations']} title={n['title']}/>
                )})
        }
        return Array(props.numppl).fill().map((n, i) => <StyledTextForm placeholder="Name" my={2} mx={1} variant="standard" size="1" key={i}/>
    )
    }

    return(
        <div>
            {renderCurrPage()}
        </div>
    )
}