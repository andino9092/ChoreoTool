import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Avatar, Paper} from "@mui/material";
import ResponsiveSlider from "./ResponsiveSlider";
import Slider from "react-slick";
import {BallTriangle} from "react-loader-spinner";
import Loading from "./Loading";

export default function Dashboard(props){

    const [formations, setFormations] = useState();
    const [displayName, setDisplayName] = useState("");
    const [src, setSrc] = useState("");
    const [numFormations, setTotalFormations] = useState(0);
    const history = useNavigate();
    useEffect(async() => {
        if (!props.status){
            history("/");
        }
    })

    useEffect(async() => {
        getData();
    }, [displayName])

    const getData = async () => {
        await fetch("choreoTool/getUsers")
            .then(response => response.json())
            .then(data => {
                setDisplayName(data.data.displayName);
                setSrc(data.data.profilePic);
            })
        await fetch("choreoTool/formations")
            .then(response => response.json())
            .then(data => {
                setFormations(data.data);
                setTotalFormations(data.formationNum);
                console.log(formations)
            })
    }


    return(
        <div>
        {formations ? 
            <Box sx={{width:'100%', }}>
                <Box sx={{my:3, mx: 2}}>
                    <Grid container direction={"row"} alignItems="center">
                        <Grid item>
                            <Avatar src={src} sx={{ width: 200, height: 200 }}/> 
                        </Grid>
                        <Grid item xs={10} >
                            <div className="heading">
                                PROFILE
                            </div>
                            <div className="name">
                                {displayName}
                            </div>
                        </Grid>
                    </Grid>
                    
                </Box>
                <Box sx={{my:3, mx:2, height:400}}>
                    <Grid container direction={"row"} alignItems="center" justifyContent="center">
                        <Grid item xs={4}>
                                <Box sx={{
                                    fontSize: 40,
                                    margin: "0 auto",
                                    textAlign: "center",
                                }} bgcolor="#2C2A2A" color="#515050" className="noForm">
                                    
                                </Box> 
                                <ResponsiveSlider formations={formations}>
                                </ResponsiveSlider>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            : 
            <Box sx={{width:'100%', justifyContent:"center", alignItems:"center"}}>
                <Box sx={{my:30, mx: 30, alignItems:"center"}}>
                    <Loading/>
                </Box>
            </Box>
}
        </div>
    )
}