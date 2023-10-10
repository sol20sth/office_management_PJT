import * as React from "react";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import style from "./ModalComponents.module.css"

const ModalComponents = (props) => {
    return (
        <Modal open={props.open} onClose={props.close}>
            <Box sx={props.style}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            <div style={{ marginTop: "2rem" }}>
                <span className={style.idchecktexthead}>
                {props.title}
                </span>
            </div>
            <div style={{ flex: "1" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "70%" }}>
                    <Typography sx={{ marginTop: "0.4rem", fontSize: "0.7rem" }}>{props.maintext}</Typography>
                    <Typography sx={{ marginTop: "0.4rem",marginLeft:props.marginleft, fontSize: "0.7rem" }}>{props.alerttext}</Typography>
                    <button className={style.signupbtn3} onClick={props.close}>
                            <p className={style.signuptext}>{props.btntext}</p>
                    </button>
                </div>
                </div>
            </div>
            </div>
            </Box>
        </Modal>
    )
}

export default ModalComponents;