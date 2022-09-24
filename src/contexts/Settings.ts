import { useState } from "react";

export interface TestSettings {
    
    ignoreUnansweredQuestions: boolean;

    neverRepeatTest: boolean;

}

const defaultSettings: TestSettings = {
    
    ignoreUnansweredQuestions: false,

    neverRepeatTest: false

};

export const useTestSettings = (): [TestSettings, <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => void] => {

    const [testSettings, setTestSettings] = useState<TestSettings>(defaultSettings);

    const updateSettings = <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => {

        setTestSettings(previous => {

            const modified = Object.assign({}, previous);
            modified[key] = value;

            return modified;

        });

    }

    return [testSettings, updateSettings];

}