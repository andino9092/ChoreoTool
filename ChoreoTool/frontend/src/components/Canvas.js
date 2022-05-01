import React, { useEffect, useRef, useState, createRef, useCallback} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Dialog, IconButton, Drawer, TextField, Box, Divider, Grid, Checkbox, FormControlLabel, FormGroup, DialogTitle, Switch} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import FormationPage from "./FormationPage";
import StyledDivider from "./StyledDivider";
import StyledTitle from "./StyledTitle";
import {styled} from "@mui/material/styles"
import { green } from "@mui/material/colors";

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

const StyledIcon = styled(IconButton)(({
    '&.MuiIconButton-sizeMedium':{
        '&:focus':{
            outline:"None",
        },
        color:"white",
        fontSize:"1rem",
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

const StyledSwitch = styled(Switch)(({
    '& .MuiSwitch-switchBase.Mui-checked': {
            color: "green",
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: "green",
    },
    '& .MuiSwitch-track': {
        backgroundColor: "grey",
    },
}))

function Canvas(props){

    const {classes} = props;


    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = 900;
    const cHeight = 500;
    const column = cWidth / horizontalSections;
    const row = cHeight / verticalSections;

    const initialLocations = () => {
        var res = [];
        const xInc = cWidth / horizontalSections / 2;
        const yInc = cHeight / verticalSections / 2;
        const numRows = cHeight / yInc - 1;
        const numCols = props.names.length / numRows;
        var ppl = props.names.length;
        for (var i = 0; i < numCols; i++){
            var pplInCol = numRows;
            if (ppl / numRows < 1){
                pplInCol = ppl;
            }
            for (var m = 0; m < pplInCol; m++){
                res.push([xInc * (i + 1), yInc * (m + 1)]);
            }
            ppl -= pplInCol;
        }
        return res;
    };

    const [numPeople, setPeople] = useState(0);
    const [locations, setLocations] = useState(props.state ? props.state.formations[0] : initialLocations()) // Current slide locations
    const [pieceLocations, setPieceLocations] = useState(props.state ? props.state.formations : [initialLocations()]);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [rowText, setRow] = useState("");
    const [colText, setCol] = useState("");
    const [title, setTitle] = useState(props.state ? props.state.title: "");
    const [numSlides, setNumSlides] = useState(props.state ? (props.state.formations  != 0 ? props.state.formations.length : 1) : 1);
    const [currSlide, setCurrentSlide] = useState(0);
    const [copyLast, setCopyLast] = useState(true);
    const [dialogOpen, toggleDialogOpen] = useState(false);
    const [disableBack, setDisableBack] = useState(true);
    const [showName, toggleNames] = useState(false);

    const references = useRef([]);
    const history = useNavigate();

    // Have a scale version that opens a page that allows you to see everything
    // Have Name displayed and logout Panel bar, one with down array and lists some settings
    // Musix Match for lyrics
    // Find fix for not beign able to close after clicking backdrop for drawer
    // Stage Front label
    // Add error handling for text fields
    // DONE Add await and async functions to Login button
    // Have no internet state
    // Check to see if drawer doesnt close outside click because its in Canvas rather than CreateFormationSlide
    // Choosing slide 
    // Add labels to people
    // Add custom colors and bind to holding down a key to show names
    // Have a hover over thing to see next location in formation
    // Fix bug with copy last formation
    // *** Deployment with django-heroku
    // Allow tighter formations 
    // Add animation to the icons at the bottom in case of extensions
    // Fix transitions from form to canvas, add animation to continue button

    // DONE Logout button 

    // References bugged as well when getting formations from dashboard
    // Clicking on Create Formation while on canvas received from dashboard doesnt go to a new canvas
    // References are bugged as well when adding a person, references are not unique either
    //      Problem is the new people arent rendering to their next position cause they have no prev position
    // Solution: guided formation making
    //      Before rendering Canvas, ask for total # of people and # of people on stage and # of ppl backstage
    //      If you need to add in a new person, it would add that person backstage, and then it would have to manually change their place for all the formations
    //      This way, it keeps track of everyones positions and the references wouldn't change

    const addPerson = async (e) => {
        e.preventDefault();
        const x = colText ? colText * column: 450;
        const y = rowText ? (verticalSections - rowText) * row : 250;
        const arr = [x, y];
        setLocations(locations => [...locations, arr]);
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

    // error handler
    // This is only for 1 formation
    const convertToDB = async () => {
        const data = pieceLocations.map((n) => {
            const res = n.length == 0? "[]" : n.map(i => {
                return "[" + i[0] + "," + i[1] + "]";
            });
            return "[" + res + "]";
        }).join()
        if (!props.state){
            await fetch("/choreoTool/formations/", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title: title ? title : "Title",
                    formations: data,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(error => console.log(error));
        }
        else{
            await fetch("/choreoTool/formations/", {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    id: props.state.id,
                    title: title,
                    formations: data,
                })
            }) 
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }

        history("/");
    }

    // Creating new slide
    const addFormations = async () => {
        // saves where location was at first
        setPieceLocations([...pieceLocations.map((n, i) => {
            return i == currSlide? locations : n;
        }), []])
        setLocations(copyLast ? locations: []);
        setCurrentSlide(numSlides);
        setNumSlides(numSlides+1);
    }

    // One for choosing slide

    const handleDrawer = () => {
        toggleDrawer(!drawerOpen);
    }

    const onDrag = (id, x, y) => {
        const xRe = x % (cWidth / horizontalSections / 2);
        const yRe = y % (cHeight / verticalSections / 2);
        const newX = (cWidth / horizontalSections / 2) - xRe < xRe ? x + ((cWidth / horizontalSections / 2) - xRe): x - xRe;
        const newY = (cHeight / verticalSections / 2) - yRe < yRe ? y + ((cHeight / verticalSections / 2)- yRe): y - yRe;
        references.current[id]?.current.to({
            x: newX,
            y: newY,
        });
        setLocations(locations.map((n, i) => {
            return i == id ? [newX, newY] : n;
        }))
        return [newX, newY];
    }

    useEffect(() => {
        references.current=Array(props.state ? locations.length : props.names.length).fill().map((_, i) => 
            references.current[i] || createRef());
    })

    useEffect(async () => {
        if (currSlide == 0){
            setDisableBack(true);
        }
        else{
            setDisableBack(false);
        }
    }, [currSlide]);

    useEffect(async () => {
        setPieceLocations(pieceLocations.map((n, i) => {
            return i == currSlide ? locations : n;
        }))
    }, [numPeople, currSlide, locations])
    
    useEffect(() => {
        console.log(pieceLocations);
        console.log(locations);
    }, [currSlide, numPeople])

    const goNext = () => {
        if (currSlide +1 >= numSlides){
            toggleDialogOpen(!dialogOpen);
            return;
        }
        setCurrentSlide(currSlide+1);
        setLocations(() => {
            return pieceLocations[currSlide+1];
        })
        for (var i = 0; i < locations.length; i++){
            const data = pieceLocations[currSlide+1][i];
            const nextX = data ? data[0] : null;
            const nextY = data ? data[1] : null;
            
            references.current[i]?.current.to({
                y: nextY,
                x: nextX,
            })
        }
    }

    const goBack = () => {
        setCurrentSlide(currSlide-1);
        setLocations(() => {
            return pieceLocations[currSlide-1];
        })
        for (var i = 0; i < locations.length; i++){
            const data = pieceLocations[currSlide-1][i];
            const prevX = data ? data[0] : null;
            const prevY = data ? data[1] : null;

            references.current[i]?.current.to({
                y: prevY,
                x: prevX,
            })
        }
    }

    const handleShowNames = () => {
        toggleNames(!showName);
    }

    return (
        <div>
            <Box sx={{my: 2, mx: 1, alignItems:"center", justifyContent:"center"}}>
                <StyledTitle variant="standard" name="title" placeholder="Title" value={title} onChange={handleTextField}/>
                <div style={{display:"flex", justifyContent: "right", marginRight:"18.75%"}}>
                    <StyledButton onClick={convertToDB} text="Save" width="10%"></StyledButton>
                </div>
            </Box>
            <div style={{display:"block", margin:"0 auto"}}>
                <FormationPage 
                    ref={references}
                    showName={showName}
                    names={props.names}
                    new={props.state ? false: true}
                    cWidth={cWidth} 
                    cHeight={cHeight}
                    locations={locations}
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
                    <StyledDivider textAlign="center" height="10px" fontSize="10px" color="white" text="CREATE MARKER"/>
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
                    <StyledDivider textAlign="center" height="10px" fontSize="10px" color="white" text="NEW SLIDES"/>
                    <Box sx={{mx:2, my:1, color:"white"}}>
                        <StyledIcon onClick={addFormations}><AddIcon sx={{color:"green"}}></AddIcon></StyledIcon>Create New Slide
                    </Box>
                    <StyledDivider textAlign="center" height="10px" fontSize="10px" color="white" text="OPTIONS"/>
                    <Box sx={{mx:2, my:1, color: "white"}}>
                        <Grid direction="row">
                            <Grid item>
                                <StyledSwitch checked={showName} onClick={handleShowNames}/>Show Names
                            </Grid>
                            <Grid item>
                                <StyledSwitch defaultChecked checked={copyLast} onClick={() => {setCopyLast(!copyLast);}}/>Copy from Last Slide
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{my:2, mx: 1}}>
                        <StyledButton text="Close" onClick={handleDrawer} width="50%" display="block" margin="0 auto"/>
                    </Box>
                </Box>
            </StyledDrawer>
        </div>
    )
}

export default Canvas;