import { useEffect, useState } from "react"
import { Test } from "./ApiTypes";

const API_URL = process.env.REACT_APP_API_URL;

type TestList = string[] | null | undefined;

export const useTest = (): [Test | null, (testName: string | Test) => void, Error | null] => {

    const [test, setTest] = useState<Test | null>(null);
    const [error, setError] = useState<Error | null>(null);
    
    const changeTest = (testName: string | Test) => {

        if (typeof testName === "string") {

            fetch(API_URL + "test/" + testName, {
    
                method: 'GET',
                mode: 'cors'
    
            })
            .then(response => {
                
                if (!response.ok) {
                    throw new Error(`Received error response code: ${response.status}!`)
                }
    
                return response.json();
    
            })
            .then((jsonData: Test) => setTest(jsonData))
            .catch((err: Error) => {
    
                console.log(err.message);
    
                setError(err);
                setTest(null);
    
            });

        } else {

            setTest(testName);

        }

    }

    return [test, changeTest, error];

}

export const useTestList = (): [TestList, Error | null] => {

    const [testList, setTestList] = useState<TestList>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {

        fetch(API_URL + "tests/", {

            method: 'GET',
            mode: 'cors'

        })
        .then(response => {
            
            if (!response.ok) {
                throw new Error(`Received error response code: ${response.status}!`)
            }

            return response.json();

        })
        .then((jsonData: string[]) => setTestList(jsonData))
        .catch((err: Error) => {
            
            console.log(err.message);
            
            setTestList(undefined);
            setError(err);

        })

    }, [])

    return [testList, error];

}