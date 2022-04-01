import React, { useEffect, useRef, useState, createRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Dialog, IconButton, Drawer, TextField, Box, Divider, Grid, Checkbox, FormControlLabel, FormGroup, DialogTitle} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import FormationPage from "./FormationPage";
import StyledDivider from "./StyledDivider";
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

    const {state} = useLocation();
    const {classes} = props;

    const [numPeople, setPeople] = useState(0);
    const [locations, setLocations] = useState(state ? state.formations[0] : []); // Current slide locations
    const [pieceLocations, setPieceLocations] = useState(state ? state.formations : [[]]);
    const [titles, setTitles] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [rowText, setRow] = useState("");
    const [colText, setCol] = useState("");
    const [title, setTitle] = useState(state ? state.title: "");
    const [numSlides, setNumSlides] = useState(state ? state.formations.length : 1);
    const [currSlide, setCurrentSlide] = useState(0);
    const [copyLast, setCopyLast] = useState(true);
    const [dialogOpen, toggleDialogOpen] = useState(false);
    const [disableBack, setDisableBack] = useState(true);
    const [formationPage, setFormationpage] = useState();

    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = 900;
    const cHeight = 500;
    const column = cWidth / horizontalSections;
    const row = cHeight / verticalSections;
    const references = useRef([]);
    const history = useNavigate();

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
    // Add custom colors and bind to holding down a key to show names
    // Have a hover over thing to see next location in formation
    // Fix bug with copy last formation
    // *** Deployment with django-heroku
    // Allow tighter formations 

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
            return "[" + n.map(i => {
                return "[" + i[0] + "," + i[1] + "]";
            }) + "]";
        }).join()
        if (!state){
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
                    id: state.id,
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

    const onDrag = async (id, x, y) => {
        const xRe = x % (cWidth / horizontalSections / 2);
        const yRe = y % (cHeight / verticalSections / 2);
        x = (cWidth / horizontalSections / 2) - xRe < xRe ? x + ((cWidth / horizontalSections / 2) - xRe): x - xRe;
        y = (cHeight / verticalSections / 2) - yRe < yRe ? y + ((cHeight / verticalSections / 2)- yRe): y - yRe;
        references.current[id].current.to({
            x: x,
            y: y,
        });
        setLocations(locations.map((n, i) => {
            return i == id ? [x, y] : n;
        }))
    }

    useEffect(() => {
        references.current=Array(locations.length).fill().map((_, i) => references.current[i] || createRef());
    })


    useEffect(async () => {
        if (currSlide == 0){
            setDisableBack(true);
        }
        else{
            setDisableBack(false);
        }
    }, [currSlide]);

    useEffect(async() => {
        setFormationpage(renderFormationPage());
    }, [numPeople, currSlide])

    useEffect(async () => {
        setPieceLocations(pieceLocations.map((n, i) => {
            return i == currSlide ? locations : n;
        }))
    }, [numPeople, currSlide, locations])

    useEffect(() => {
        console.log(pieceLocations);
        console.log(locations);
    }, [currSlide, numPeople])

    const renderFormationPage = () => {
        return (<FormationPage 
            ref={references}
            new={state ? false: true}
            cWidth={cWidth} 
            cHeight={cHeight}
            locations={locations}
            horizontalSections={horizontalSections}
            verticalSections={verticalSections}
            onDrag={onDrag}
            />)
    }

    const goNext = async() => {
        if (currSlide +1 >= numSlides){
            toggleDialogOpen(!dialogOpen);
            return;
        }
        setPieceLocations(pieceLocations.map((n, i) => {
            return i == currSlide ? locations : n;
        }))
        setCurrentSlide(currSlide+1);
        setLocations(() => {
            return pieceLocations[currSlide+1];
        })
        for (var i = 0; i < locations.length; i++){
            const data = pieceLocations[currSlide+1][i];
            const nextX = data ? data[0] : null;
            const nextY = data ? data[1] : null;
            console.log(references.current[i].current);
            references.current[i].current.to({
                y: nextY,
                x: nextX,
            })
        }
    }

    const goBack = async() => {
        setPieceLocations(pieceLocations.map((n, i) => {
            return i == currSlide ? locations : n;
        }))
        setCurrentSlide(currSlide-1);
        setLocations(() => {
            return pieceLocations[currSlide-1];
        })
        for (var i = 0; i < locations.length; i++){
            const data = pieceLocations[currSlide-1][i];
            const prevX = data ? data[0] : null;
            const prevY = data ? data[1] : null;
            if (!prevX){
                references.current[i].current.x = null;
                references.current[i].current.y = null;
                continue;
            }
            references.current[i].current.to({
                y: prevY,
                x: prevX,
            })
        }
    }



    return (
        <div>
            <Box sx={{my: 2, mx: 1, alignItems:"center", justifyContent:"center"}}>
                <TitleStyle variant="standard" name="title" placeholder="Title" value={title} onChange={handleTextField}></TitleStyle>
                <div style={{display:"flex", justifyContent: "right", marginRight:"18.75%"}}>
                    <StyledButton onClick={convertToDB} text="Save" width="10%"></StyledButton>
                </div>
            </Box>
            <div style={{display:"block", margin:"0 auto"}}>
                {formationPage}
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
        </div>
    )
}

export default Canvas;