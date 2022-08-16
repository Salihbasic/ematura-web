import { CheckBox } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

export default function FinishButton(props) {

    const finishHandler = props.finishHandler;

    const stats = props.stats;

    const wrongAnswers = props.wrongAnswers;
    const addNewTest = props.addNewTest;

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

                    {(stats.incorrect !== 0) && 
                        <Typography variant="body1">
                            Želite li ponovo pokušati odgovoriti netačno odgovorena pitanja?
                        </Typography>
                    }

                </DialogContent>

                <DialogActions>

                    {(stats.incorrect === 0) &&

                        <Button variant="contained" 
                                onClick={() => setOpen(false)}>
                            Ok
                        </Button>

                    }

                    {(stats.incorrect !== 0) &&
                    
                        <>

                        <Button variant="contained"
                                onClick={() => {
                                    addNewTest(wrongAnswers);
                                    setOpen(false);
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

const getPercent = (num, total) => {
    
    const prct = (num / total) * 100;

    return Math.round((prct + Number.EPSILON) * 100) / 100;

}