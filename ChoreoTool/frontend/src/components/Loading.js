import React from "react";


export default function Loading(props){

    const style = {
        justifyContent:"center",
        display:"flex",
    }

    return (
        <div style={style}>
            <svg width="100" height="100" stroke="green" viewBox="0 0 57 57">
                <g fill="green" fillRule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle cx="5" cy="50" r="5">
                            <animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="27" cy="5" r="5">
                            <animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="49" cy="50" r="5">
                            <animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </g>
            </svg>
        </div>
    )
}