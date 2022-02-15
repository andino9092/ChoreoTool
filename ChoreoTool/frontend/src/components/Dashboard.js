import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Avatar, Typography} from "@mui/material";

export default function Dashboard(props){

    const [formations, setFormations] = useState();
    const [displayName, setDisplayName] = useState("");
    const [src, setSrc] = useState("");
    const history = useNavigate();
    useEffect(async() => {
        if (!props.status){
            history("/");
        }
        if (!displayName){
            await getData();
        }
    })
    
    const getData = async () => {
        fetch("choreoTool/getUsers")
            .then(response => response.json())
            .then(data => {
                setDisplayName(data.data.displayName);
                setSrc(data.data.profilePic);
            })
        fetch("choreoTool/getFormations")
            .then(response => response.json())
            .then(data => {
                setFormations(data);
            })
    }
    return(
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
        </Box>
    )
}