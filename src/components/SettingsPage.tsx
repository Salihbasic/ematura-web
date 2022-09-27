import { Button, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { TestSettings } from "../contexts/Settings";
import { useSettings } from "../contexts/SettingsContext";

import './stylesheets/SettingsPage.css'

export default function SettingsPage() {

    const settingsContext = useSettings();

    const [newSettings, setNewSettings] = useState(structuredClone(settingsContext.settings));

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
                    <Switch checked={newSettings.neverRepeatTest} onChange={(event) => handleChange(event, "neverRepeatTest")} />
                }
                label="Onemogući ponavljanje testova" 
                />

                <FormControlLabel control={
                    <Switch checked={newSettings.randomiseQuestions} onChange={(event) => handleChange(event, "randomiseQuestions")} />
                }
                label="Uvijek izmiješaj raspored pitanja"
                />

            </FormGroup>
            
        </div>


            <div className="settingsButtons">

                <Button variant="contained" onClick={() => {
                    
                    let k: keyof TestSettings;
                    for (k in newSettings) {

                        const v = newSettings[k];
                        settingsContext.updateSettings(k, v);

                    }

                }}>
                    Sačuvaj
                </Button>

            </div>

        </div>

    )

}