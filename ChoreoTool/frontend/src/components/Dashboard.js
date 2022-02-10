import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard(props){

    const [data, setData] = useState();
    const [displayName, setDisplayName] = useState("");
    const [src, setSrc] = useState("");
    const history = useNavigate();
    useEffect(async() => {
        if (!props.status){
            history("/");
        }
        if (!data){
            await getData();
        }
    })
    
    const getData = async () => {
        fetch("choreoTool/getUsers")
            .then(response => response.json())
            .then(data => {

                setData(data.data);
                setDisplayName(data.data.displayName);
                setSrc(data.data.profilePic);
            })
    }
    return(
        <div>
            <div className="pfp">
                <img src={src} className="rounded"></img>
            </div>
            
            {displayName}
        </div>
    )
}