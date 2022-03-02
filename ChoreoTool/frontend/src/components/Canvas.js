import { height, textAlign } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {Stage, Shape, Layer, Circle} from "react-konva"
import {Dialog, IconButton, Drawer, TextField, Box, Divider, Grid, Checkbox, FormControlLabel, FormGroup, DialogTitle} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Person from "./Person";
import { withStyles } from "@mui/styles";
import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import FormationPage from "./FormationPage";
import {styled} from "@mui/material/styles"

const StyledDialog = styled(Dialog)(({
    '&.MuiDialog-root':{
        '& .MuiDialog-scrollPaper':{
            '& .MuiDialog-paperWidthSm':{
                backgroundColor:"#1E1C1C",
                color:"white",
            }
        }
    }
}))

const StyledCheckbox = styled(Checkbox)(({
    '&.PrivateSwitchBase-root':{
        color:"green",
        '&:hover':{
            color:"white",
        },
        '&:focus':{
            outline:"None",
        }
    }
}))

const StyledIcon = styled(IconButton)(({
    '&.MuiIconButton-sizeMedium':{
        '&:focus':{
            outline:"None",
        },
        color:"white",
        fontSize:"1rem",
    }
}))

const StyledDivider = styled(Divider)(({
    '&.MuiDivider-withChildren':{
        '&::before':{
            borderTop:"white solid 1px"
        },
        '&::after':{
            borderTop:"white solid 1px"
        }
    }

}))

const StyledDrawer = styled(Drawer)(({
    '&.MuiDrawer-docked':{
        backgroundColor: "#1E1C1C",
        '& .MuiDrawer-paperAnchorDockedRight':{
            backgroundColor: "#1E1C1C",
            width: "250px",
        },
    }
}))

const TitleStyle = styled(TextField)(({
    
    '& label.Mui-focused':{
        color: "white",
    },

    '& label':{
        color: "white",
    },

    '& .MuiInputBase-formControl':{

        borderBottom: "None",

        
        '& .MuiInputBase-input': {
            color: "white",
            textAlign: "center",
            fontSize: "40px",
            letterSpacing: "4px",
        },
        '&::before':{
            borderBottom: "None",
        },
        '&::after':{
            borderBottom: "white solid 2px",
        }
      

    },
    '&.MuiTextField-root':{
        display: "block",
        alignItems: "center",
        textAlign: "center",
    }
}))

function Canvas(props){

    const {classes} = props;

    const [numPeople, setPeople] = useState(0);
    const [pages, setPages] = useState(0);
    const [locations, setLocations] = useState([]); // Current slide locations
    // If need th others, use all data
    const [pieceLocations, setPieceLocations] = useState([[]]);
    const [titles, setTitles] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [rowText, setRow] = useState("");
    const [colText, setCol] = useState("");
    const [title, setTitle] = useState("");
    const [numSlides, setNumSlides] = useState(1);
    const [currSlide, setCurrentSlide] = useState(0);
    const [copyLast, setCopyLast] = useState(true);
    const [dialogOpen, toggleDialogOpen] = useState(false);
    const [disableBack, setDisableBack] = useState(true);
    const [prevSlide, setPrevSlide] = useState();
    const [nextSlide, setNextSlide] = useState();

    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = window.innerWidth/1.5;
    const cHeight = window.innerHeight/1.5;
    const column = cWidth / horizontalSections;
    const row = cHeight / verticalSections;

    // Have a scale version that opens a page that allows you to see everything
    // Musix Match for lyrics
    // Find fix for not beign able to close after clicking backdrop
    // Stage Front label
    // Add error handling for text fields
    // Add await and async functions to Login button
    // Have no internet state
    // Check to see if drawer doesnt close outside click because its in Canvas rather than CreateFormationSlide
    // Choosing slide 
    // Add labels to people
    //      Add custom colors and bind to holding down a key to show names

    const addPerson = async (e) => {
        e.preventDefault();
        const x = colText ? colText * column: 500;
        const y = rowText ? (verticalSections - rowText) * row : 300;
        const arr = [x, y];
        const wait = await setLocations(locations => [...locations, arr]);
        setPeople(numPeople + 1);
    }

    const handleTextField = (e) => {
        if (e.target.name == "y"){
            setRow(e.target.value);
        }
        else if (e.target.name == "title"){
            setTitle(e.target.value);
        }
        else{
            setCol(e.target.value);
        }
    }

    // error handler, if it is empty don't save
    // This is only for 1 formation page
    const convertData = () => {
        var locs = locations.map((n) => "[" + n[0] + "," + n[1] + "]");
    }

    // Creating new slide
    const addFormations = async () => {
        await setTitles(titles => [...titles, title]);
        await setTitle("");
        // saves where location was at first
        await setPieceLocations([...pieceLocations.map((n, i) => {
            return i == currSlide? locations : n;
        }), []])
        await setLocations(copyLast ? locations: []);
        await setCurrentSlide(numSlides);
        await setPrevSlide(numSlides-1)
        await setNextSlide(numSlides+1);
        await setNumSlides(numSlides+1);
    }

    // One for choosing slide

    const handleDrawer = () => {
        toggleDrawer(!drawerOpen);
    }

    const onDrag = async (id, x, y) => {
        await setLocations(locations.map((n, i) => {
            return i == id ? [x, y] : n;
        }))
    }

    useEffect(async () => {
        if (currSlide == 0){
            await setDisableBack(true);
        }
        else{
            await setDisableBack(false);
        }
    }, [currSlide]);


    useEffect(() => {
        console.log(pieceLocations);
        console.log(prevSlide);
        console.log(locations);
    }, [currSlide])

    const goNext = async() => {
        if (currSlide +1 >= numSlides){
            await toggleDialogOpen(!dialogOpen);
            return;
        }
        await setPieceLocations(pieceLocations.map((n, i) => {
            return i == currSlide ? locations : n;
        }))
        await setCurrentSlide(currSlide+1);
        await setLocations(() => {
            return pieceLocations[currSlide+1];
        })
        await setPrevSlide(currSlide);
        await setNextSlide(currSlide+2);
    }

    const goBack = async() => {
        await setPieceLocations(pieceLocations.map((n, i) => {
            console.log(currSlide);
            return i == currSlide ? locations : n;
        }))
        await setCurrentSlide(currSlide-1);
        await setLocations(() => {
            return pieceLocations[currSlide-1];
        })
        await setPrevSlide(currSlide-2);
        await setNextSlide(currSlide);
    }

    const organize = () => {
        let data = [[], [], []];
        data[1] = locations;
        if (prevSlide >= 0){
            data[0] = pieceLocations[prevSlide];
        }
        if (nextSlide < numSlides){
            data[2] = pieceLocations[nextSlide];
        }
        return data;
    }

    const data = organize();

    const moveNext = () => {

    }

    return (
        <div>
            {console.log(data[0], data[1], data[2])}
            <Box sx={{my: 2, mx: 2}}>
                <div style={{display:"flex", justifyContent: "right", marginRight:"10%"}}>
                    <StyledButton onClick={convertData} text="Save" width="10%"></StyledButton>
                </div>
            </Box>
            <form>
                <Box sx={{my: 2, mx: 1, alignItems:"center", justifyContent:"center"}}>
                    <TitleStyle variant="standard" name="title" placeholder="Title" value={title} onChange={handleTextField}></TitleStyle>
                </Box>
                <div style={{display:"block", margin:"0 auto"}}>
                    <FormationPage 
                        cWidth={cWidth} 
                        cHeight={cHeight}
                        locations={data}
                        horizontalSections={horizontalSections}
                        verticalSections={verticalSections}
                        onDrag={onDrag}
                        />
                </div>
                <Box sx={{my:3, mx: 2, alignItems:"center", justifyContent:"center"}}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item>
                            <StyledIcon onClick={goBack} disabled={disableBack} sx={{opacity: disableBack? "30%": "100%"}}><ArrowBackIcon></ArrowBackIcon></StyledIcon>
                            <StyledButton onClick={handleDrawer} width="5%" margin="0 auto" text="Tools"/>
                            <StyledIcon onClick={goNext}><ArrowForwardIcon></ArrowForwardIcon></StyledIcon>
                            <StyledDialog open={dialogOpen}>
                                <DialogTitle>
                                    Create a new Slide?
                                </DialogTitle>
                                <Grid container direction="row">
                                    <Grid item xs={6}>
                                        <Box sx={{my:1, mx: 1, justifyContent:"center", textAlign:"center"}}>
                                            <StyledButton onClick={() => {
                                                toggleDialogOpen(!dialogOpen);
                                                addFormations();
                                                console.log(dialogOpen);
                                            }}
                                            text="Yes"    
                                            width="75%"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{my:1, mx: 1, justifyContent:"center", textAlign:"center"}}>
                                            <StyledButton onClick={() => {
                                                toggleDialogOpen(!dialogOpen);
                                            }}
                                            text="No"
                                            width="75%"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </StyledDialog>
                        </Grid>
                        <Grid item>
                            {currSlide +1} / {numSlides}
                        </Grid>
                    </Grid>
                </Box>
                <StyledDrawer
                    anchor="right"
                    open={true}
                    onClose={handleDrawer}
                    onOpen={handleDrawer}
                    variant="persistent">
                    <Box>
                        <Box sx={{height:"50px"}}>
                            <h1 style={{color:"white", display:"block", margin:"0 auto", textAlign:"center",}}>Tools</h1>
                        </Box>
                        <StyledDivider textAlign="center" sx={{height:"10px", fontSize:"10px", color:"white"}}>CREATE MARKER</StyledDivider>
                        <Box sx={{height:"150px"}}>   
                                <Box sx={{my: 2, mx: 1, alignItems:"center"}}>
                                    <Grid container direction={"row"} alignItems="center" justifyContent="center">
                                        <StyledText value={rowText} onChange={handleTextField} name="y" label="Row" width="75px" height="50px" padding="2px"/>
                                        <StyledText value={colText} onChange={handleTextField} name="x" label="Col" width="75px" height="50px" padding="2px"/>
                                    </Grid>  
                                </Box>
                                <Grid container direction={"center"} alignItems="center" justifyContent="center">
                                        <StyledButton text="Create Person" onClick={addPerson} style={{ display:"block", margin:"0 auto"}}/>
                                </Grid>
                        </Box>
                        <StyledDivider textAlign="center" sx={{height:"10px", fontSize:"10px", color:"white"}}>NEW SLIDES</StyledDivider>
                        <Box sx={{mx:2, my:1}}>
                            <StyledIcon onClick={addFormations}><AddIcon sx={{color:"green"}}></AddIcon>Create New Slide</StyledIcon>
                            <FormGroup sx={{color:"white"}}>
                                <FormControlLabel control={<StyledCheckbox defaultChecked onClick={() => {setCopyLast(!copyLast);}} />} label="Copy from Last Slide" />
                            </FormGroup>
                        </Box>
                        <Box sx={{my:2, mx: 1}}>
                            <StyledButton text="Close" onClick={handleDrawer} width="50%" display="block" margin="0 auto"/>
                        </Box>
                    </Box>
                </StyledDrawer>
            </form>
        </div>
    )
}

export default Canvas;