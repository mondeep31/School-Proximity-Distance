const express = require('express');
const app = express();

const connection = require("./db");
const { validateSchoolData } = require('./middleware');
const { distance } = require('./distance');

app.use(express.json());

//import the calculated distance from distance.js
const calculateDistance = distance;

app.post("/addSchool", validateSchoolData, (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    const query = 'INSERT INTO school_info (name, address, latitude, longitude) VALUES (?,?,?,?)';

    connection.query(query, [name, address, latitude, longitude], (err, results) => {
        if (err) {
            console.error("error while inserting school data: ", err);
            return res.status(500).json({
                error: "Adding School Failed"
            })
        }
        res.status(201).json({
            message: "School added successfully", schoolId: results.insertId
        })
    })
})



app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;
    //query params
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    connection.query('SELECT * FROM school_info', (err, results) => {
        if (err) {
            console.error('Error while fetching schools:', err);
            return res.status(500).json({ error: 'Failed to retrieve schools' });
        }

        // as lats and longs need to be in float as defined in db
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        const sortedSchools = results.map(school => {
            const distance = calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
});




app.listen(3000, function () {
    console.log('App listening on port 3000')
    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('database connected')
            const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS school_info (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    latitude FLOAT NOT NULL,
                    longitude FLOAT NOT NULL
                )
            `;
            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.log("Error while creating table: ", err);
                } else {
                    console.log("Table school_info created/already exists");
                }
            })

        }
    })
})