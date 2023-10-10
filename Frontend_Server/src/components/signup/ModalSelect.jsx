import * as React from "react";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import style from "./ModalSelect.module.css"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const ModalComponents = (props) => {
    return (
        <Modal open={props.open} onClose={props.close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={props.style}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            <div style={{ flex: "1" }}>
                <div  style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "70%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Box className={style.cornamebox} onClick={props.onclick}>
                        <FormControl fullWidth>
                            <InputLabel id={props.id}>{props.title}</InputLabel>
                            <Select
                            labelId={props.id}
                            id={props.id}
                            value={props.value}
                            label={props.label}
                            onChange={props.onchange}
                            >
                                {props.item}
                            </Select>
                        </FormControl>
                    </Box>
                    <button className={style.signupbtn4} onClick={props.close}>
                        <p className={style.signuptext}>확 인</p>
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