const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

// Use CORS and JSON body parser middleware
app.use(cors());
app.use(express.json());

app.post('/add', (req, res) => {
    // Destructure the numbers from req.body
    const { number1, number2 } = req.body;

    // Perform the addition
    const result = Number(number1) + Number(number2);

    // Send the result back as JSON
    res.json({ result });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


