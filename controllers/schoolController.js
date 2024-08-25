
const School = require('../models/schoolModel');
const { getDistanceBetweenCoordinates } = require('../utils');

const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    try {
        const results = await School.addSchool({ name, address, latitude, longitude });
        return res.status(201).json({
            message: "School added successfully",
            schoolId: results.insertId
        })
    } catch (err) {
        console.error("Error while inserting school data: ", err);
        res.status(500).json({
            error: "Adding school failed"
        })
    }
};

const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;


    try {
        const results = await School.listSchools();
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        const sortedSchools = results.map(school => {
            const schoolDistance = getDistanceBetweenCoordinates(userLatitude, userLongitude, school.latitude, school.longitude);
            return { ...School, distance: schoolDistance }
        }).sort((a, b) => a.distance - b.distance);
        res.status(200).json(sortedSchools);

    } catch (err) {
        console.error("Error while fetching schools: ", err);
        res.status(500).json({ error: "Failed to retrieve schools" });
    }
};

module.exports = {
    addSchool,
    listSchools
};