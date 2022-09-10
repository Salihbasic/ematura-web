import { Button, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { TestSettings } from "../Settings";

import './stylesheets/SettingsPage.css'

export default function SettingsPage(props: { settingsObject: TestSettings;
                                              updateSettings: <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => void; }) {

    const [newSettings, setNewSettings] = useState(structuredClone(props.settingsObject));

    const handleChange = <K extends keyof TestSettings>(event: React.ChangeEvent<HTMLInputElement>, key: K) => {
        
        setNewSettings(previous => {

            const modified = Object.assign({}, previous);
            modified[key] = event.target.checked;

            return modified;

        });

    }

    return (

        <div className="settingsPage">

            <Typography variant="h4">
                Postavke
            </Typography>

        <div className="allTests">

            <Typography variant="h6">
                Ove opcije vrijede za sve testove:
            </Typography>

            <FormGroup>

                <FormControlLabel control={
                    <Switch checked={newSettings.showCorrectAnswersImmediately} onChange={(event) => handleChange(event, "showCorrectAnswersImmediately")} />
                }
                label="Naznači pogrešne odgovore" 
                />

                <FormControlLabel control={
                    <Switch checked={newSettings.ignoreUnansweredQuestions} onChange={(event) => handleChange(event, "ignoreUnansweredQuestions")} />
                }
                label="Ne računaj neodgovorena pitanja pogrešnim" 
                />
                
                <FormControlLabel control={
                    <Switch checked={newSettings.neverRepeatTest} onChange={(event) => handleChange(event, "neverRepeatTest")} />
                }
                label="Onemogući ponavljanje testova" />

            </FormGroup>
            
        </div>


            <div className="settingsButtons">

                <Button variant="contained" onClick={() => {
                    
                    let k: keyof TestSettings;
                    for (k in newSettings) {

                        const v = newSettings[k];
                        props.updateSettings(k, v);

                    }

                }}>
                    Sačuvaj
                </Button>

            </div>

        </div>

    )

}