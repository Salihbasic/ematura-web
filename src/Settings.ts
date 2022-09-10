import { useState } from "react";

export interface TestSettings {

    showCorrectAnswersImmediately: boolean;
    
    ignoreUnansweredQuestions: boolean;

    neverRepeatTest: boolean;

}

export const useTestSettings = (): [TestSettings, <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => void] => {

    const [testSettings, setTestSettings] = useState<TestSettings>(
        {
            showCorrectAnswersImmediately: false,

            ignoreUnansweredQuestions: false,

            neverRepeatTest: false
        }
    );

    const updateSettings = <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => {

        setTestSettings(previous => {

            const modified = Object.assign({}, previous);
            modified[key] = value;

            return modified;

        });

    }

    return [testSettings, updateSettings];

}