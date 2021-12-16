const express = require('express');
const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('weather'));

// const apiKey = a22bb3672a61767ba111ec9a163020d7;

// Server setup
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});

projectData = {};

// GET Route
app.get('/weather', (req, res) => res.send(projectData));

// POST Route
app.post('/weather/saved', (req, res) =>{
    projectData = req.body;
    console.log(req.body);
    res.end();
})