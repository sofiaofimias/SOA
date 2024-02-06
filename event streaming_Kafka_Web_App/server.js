const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
app.post('/produce', (req, res) => {
    const userMessage = req.body.message;

    const processDogHotelRequest = (request) => {
        switch (request) {
            case 'check-in':
                console.log('Check-in request received. Processing...');
                return 'Dog checked in successfully.';
            case 'check-out':
                console.log('Check-out request received. Processing...');
                return 'Dog checked out successfully.';
            case 'book-room':
                console.log('Room booking request received. Processing...');
                return 'Room booked successfully.';
            default:
                console.log('Unknown request received.');
                return 'Unknown request.';
        }
    };

    const resultMessage = processDogHotelRequest(userMessage);
    res.json({ success: true, message: resultMessage });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
