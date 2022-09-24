import { CheckBox } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSettings } from "../../contexts/SettingsContext";
import { TestStats } from "./Test";

export default function FinishButton(props: { finishHandler: () => void; 
                                              stats: TestStats;
                                              restartHandler: () => void }) {

    const finishHandler = props.finishHandler;

    const stats = props.stats;

    const settings = useSettings();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" 
                    startIcon={ <CheckBox /> }
                    onClick={() =>{
                        finishHandler();
                        setOpen(true);
                    }}
                    >
                Završi
            </Button>

            <Dialog open={open}>

                <DialogTitle id="finish-dialog-title">

                    <Typography variant="h5">
                        Rezultati
                    </Typography>

                </DialogTitle>

                <DialogContent id="finish-dialog-content">

                    <Typography variant="body1">
                        Odgovorili ste {stats.answered} od {stats.total} pitanja. 
                    </Typography>

                    <Typography variant="body1">
                        Tačno ste odgovorili {stats.correct} pitanja, odnosno {getPercent(stats.correct, stats.total)}% testa.
                    </Typography>

                    <Typography variant="body1">
                        Niste odgovorili {stats.unanswered} pitanja.
                    </Typography>

                    <Typography variant="body1">
                        Netačno ste odgovorili {stats.incorrect} pitanja. 
                    </Typography>

                    {(stats.incorrect !== 0) && (!settings.settings.neverRepeatTest) &&
                        <Typography variant="body1">
                            Želite li ponovo pokušati odgovoriti netačno odgovorena pitanja?
                        </Typography>
                    }

                </DialogContent>

                <DialogActions>

                    {((stats.incorrect === 0) || (settings.settings.neverRepeatTest)) &&

                        <Button variant="contained" 
                                onClick={() => setOpen(false)}>
                            Ok
                        </Button>

                    }

                    {(stats.incorrect !== 0) && (!settings.settings.neverRepeatTest) &&
                    
                        <>

                        <Button variant="contained"
                                onClick={() => {
                                    setOpen(false);
                                    props.restartHandler();
                                }}>
                            Da
                        </Button>

                        <Button variant="contained" 
                                onClick={() => setOpen(false)}>
                            Ne
                        </Button>
                        
                        </>

                    }

                </DialogActions>

            </Dialog>
        </>
    )

}

const getPercent = (num: number, total: number) => {
    
    const prct = (num / total) * 100;

    return Math.round((prct + Number.EPSILON) * 100) / 100;

}