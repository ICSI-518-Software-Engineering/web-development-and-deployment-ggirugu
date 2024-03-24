import React, { useState } from "react";
import axios from 'axios';
import './Addition.css'; // Make sure this path is correct

const Addition = () => {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [frontendResult, setFrontendResult] = useState(null);
    const [backendResult, setBackendResult] = useState(null);

    const handleAddition = async () => {
        try {
            const response = await axios.post('http://ec2-35-171-185-33.compute-1.amazonaws.com:8080/add', { number1, number2 });
            setBackendResult(response.data.result);
            setFrontendResult(Number(number1) + Number(number2));
        } catch (error) {
            console.error('There was an error performing the addition:', error);
        }
    };

    return (
        <div className="addition-container mt-4">
            <div className="addition-card">
                <h1 className="addition-title">Add Numbers</h1>
                <div className="addition-inputs">
                    <label htmlFor="number1">Enter Number 1:</label>
                    <input
                        type="number"
                        id="number1"
                        className="number-input"
                        value={number1}
                        onChange={(e) => setNumber1(e.target.value)}
                        placeholder="Enter first number"
                    />
                    <span className="plus-icon">+</span>
                    <label htmlFor="number2">Enter Number 2:</label>
                    <input
                        type="number"
                        id="number2"
                        className="number-input"
                        value={number2}
                        onChange={(e) => setNumber2(e.target.value)}
                        placeholder="Enter second number"
                    />
                </div>
                <button className="addition-button" onClick={handleAddition}>
                    Add
                </button>
                {frontendResult !== null && (
                    <h2>Frontend Result: <span className="result-value">{frontendResult}</span></h2>
                )}
                {backendResult !== null && (
                    <h2>Backend Result: <span className="result-value">{backendResult}</span></h2>
                )}
            </div>
        </div>
    );
};

export default Addition;
