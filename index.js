const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USER_ID = "john_doe_17091999"; // Replace with actual logic for dynamic user ID
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;

    // Validate file and handle Base64
    let file_valid = false;
    let file_mime_type = "";
    let file_size_kb = 0;

    if (file_b64) {
        // Decode Base64 and determine MIME type and size
        const buffer = Buffer.from(file_b64, 'base64');
        file_size_kb = buffer.length / 1024;
        file_valid = true; // Logic for MIME type validation goes here
        file_mime_type = "image/png"; // Placeholder
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_lowercase_alphabet = alphabets.filter(char => char === char.toLowerCase());
    
    const highest = highest_lowercase_alphabet.length > 0 
        ? [highest_lowercase_alphabet.sort().pop()] 
        : [];

    res.json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest,
        file_valid,
        file_mime_type,
        file_size_kb: file_size_kb.toFixed(2)
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
