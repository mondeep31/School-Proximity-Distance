const connection = require("../config/database");

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
});


const addSchool = (schoolData, callback) => {
    const query = 'INSERT INTO school_info (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    connection.query(query, [schoolData.name, schoolData.address, schoolData.latitude, schoolData.longitude], callback);
};

const listSchools = (callback) => {
    const query = 'SELECT * FROM school_info';
    connection.query(query, callback);
};

module.exports = {
    addSchool,
    listSchools
};