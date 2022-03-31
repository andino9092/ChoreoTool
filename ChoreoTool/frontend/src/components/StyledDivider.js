import React from "react";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

const NDivider = styled(Divider)(({
    '&.MuiDivider-withChildren':{
        '&::before':{
            borderTop:"white solid 1px"
        },
        '&::after':{
            borderTop:"white solid 1px"
        }
    }

}))

export default function StyledDivider(props){
    return <NDivider
            textAlign={props.textAlign}
            sx={{
                height:props.height,
                fontSize:props.fontSize,
                color:props.color,
                borderTop:props.borderTop,
            }}
            >
                {props.text?props.text:""}
            </NDivider>
}