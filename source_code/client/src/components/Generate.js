import React, { useState } from 'react';
import axios from 'axios';
import './Generate.css'; // Import CSS file for Generate component styling

const Generate = () => {
    const [input, setInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSearch = async () => {
        try {
            setLoading(true); // Set loading state to true when starting the search
            const response = await axios.post(
                'https://trains.p.rapidapi.com/',
                { search: input },
                {
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '370c0969e5msh893657941623281p1308e6jsn50817d58b835',
                        'X-RapidAPI-Host': 'trains.p.rapidapi.com'
                    }
                }
            );
            setResponseData(response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching data.');
            setResponseData(null);
        } finally {
            setLoading(false); // Set loading state to false after the search is complete
        }
    };

    return (
        <div className="container mt-4">
            <h2>Train Search</h2>
            <p className="mb-4">Enter a train number or name to search for train details. (Try Searching LTT, 17735)</p>
            <div className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter train number or name"
                    />
                </div>
                <div className="input-group mt-2">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {loading && <div className="mt-4 text-center">Loading...</div>} {/* Show loading indicator */}
                {responseData && (
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>Train Number</th>
                                <th>Name</th>
                                <th>Train From</th>
                                <th>Train To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseData.map((train) => (
                                <tr key={train.train_num} className="table-row">
                                    <td>{train.train_num}</td>
                                    <td>{train.name}</td>
                                    <td>{train.train_from}</td>
                                    <td>{train.train_to}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Generate;
