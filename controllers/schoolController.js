// controllers/schoolController.js
const School = require('../models/schoolModel');
const { distance } = require('../utils/distance');

const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    School.addSchool({ name, address, latitude, longitude }, (err, results) => {
        if (err) {
            console.error("Error while inserting school data: ", err);
            return res.status(500).json({
                error: "Adding School Failed"
            });
        }
        res.status(201).json({
            message: "School added successfully",
            schoolId: results.insertId
        });
    });
};

const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    School.listSchools((err, results) => {
        if (err) {
            console.error('Error while fetching schools:', err);
            return res.status(500).json({ error: 'Failed to retrieve schools' });
        }

        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        const sortedSchools = results.map(school => {
            const schoolDistance = distance(userLatitude, userLongitude, school.latitude, school.longitude);
            return { ...school, distance: schoolDistance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
};

module.exports = {
    addSchool,
    listSchools
};