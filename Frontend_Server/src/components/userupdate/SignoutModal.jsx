import * as React from "react";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import style from "./SignoutModal.module.css"
import Typography from '@mui/material/Typography';

const ModalComponents = (props) => {
    return (
        <Modal open={props.open} onClose={props.close}>
            <Box sx={props.style}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            <div style={{ marginTop: "2rem" }}>
                <span className={style.signouttexthead}>
                {props.title}
                </span>
            </div>
            <div style={{ flex: "1" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "70%" }}>
                    <div>
                        <Typography sx={{ fontSize: "0.72rem" }}>{props.maintext}</Typography>                    
                    </div>
                    <div className={style.btn}>
                        <button className={style.closebtn} onClick={props.close}>
                                <p className={style.signuptext}>{props.btnclosetext}</p>
                        </button>
                        <button className={style.okbtn} onClick={props.ok}>
                                <p className={style.signuptext}>{props.btnoktext}</p>
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </Box>
        </Modal>
    )
}

export default ModalComponents;