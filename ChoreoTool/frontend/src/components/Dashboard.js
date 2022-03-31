import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Avatar, Paper, Divider} from "@mui/material";
import StyledDivider from "./StyledDivider";
import Loading from "./Loading";
import SelectFormation from "./SelectFormation";

export default function Dashboard(props){

    const [formations, setFormations] = useState();
    const [hover, toggle] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [src, setSrc] = useState("");
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
                console.log(data)
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
                <Grid container direction={"row"} alignItems="center" justifyContent="center">
                    <Grid item xs={6}>
                        <Paper 
                            sx={{
                                backgroundColor: "#2e2c2c",
                                paddingTop:"1px",
                                paddingBottom:"1px",
                                height:"100%",
                            }} 
                            elevation="24">
                                {formations.map((n, i) => {
                                    return (
                                        <>
                                            <SelectFormation formations={n['formations']} title={n['title']}/>
                                            {i != formations.length - 1 ? <StyledDivider borderTop="white solid 1px"/> : ""}
                                        </>
                                    )
                                })}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            :
            <Box sx={{my: 30, width:'100%', justifyContent:"center", alignItems:"center"}}>
                <Box sx={{my:30, mx: 30, alignItems:"center"}}>
                    <Loading/>
                </Box>
            </Box>

}
        </div>
    )
}