import React, {useState} from "react";


export default function User(props){

    const [data, setData] = useState();

    fetch("/choreoTool/getUsers")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });


    return(
        <div>
            {data}
        </div>
    )
}