import React, { createContext, useContext } from "react";
import { TestSettings, useTestSettings } from "./Settings";

type SettingsProviderProps = { children: React.ReactNode };
type SettingsType = { 
    settings: TestSettings; 
    updateSettings: <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => void 
}

const SettingsContext = createContext<SettingsType | undefined>(undefined);

export const SettingsProvider = ({children}: SettingsProviderProps) => {

    const [testSettings, updateSettings] = useTestSettings();

    const value: SettingsType = { settings: testSettings, updateSettings: updateSettings };

    return (
    
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    
    )

}

export const useSettings = () => {

    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error("'useSettingsProvider' must be used within <SettingsProvider>!")
    }

    return context;

}