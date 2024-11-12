const express = require('express');
const { readFile } = require('fs');
const app = express();
const PORT = 4070;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Working hours middleware
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Check if the current time is within working hours (Monday to Friday, 9 AM to 5 PM)
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        return next();  // Proceed to the next middleware or route handler
    }

    // If outside working hours, send a response
    res.send("Our website is only available Monday to Friday, from 9 AM to 5 PM.");
};

// Routes
app.get('/home', workingHoursMiddleware, (req, res) => {
    readFile('./home.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the home page.");
            return;
        }
        res.send(data); // Send the content of home.html as response
    });
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    readFile('./services.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the services page.");
            return;
        }
        res.send(data); // Send the content of services.html as response
    });
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    readFile('./contact.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the contact page.");
            return;
        }
        res.send(data); // Send the content of contact.html as response
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${4070}`);
});
