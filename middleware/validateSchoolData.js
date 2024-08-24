const validateSchoolData = (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;

    let errorMessage = "";

    if (!name) {
        errorMessage = "Invalid Input: 'name' is required "
    } else if (!address) {
        errorMessage = "Invalid Input: 'address' is required "
    } else if (typeof latitude !== 'number') {
        errorMessage = "Invalid Input: 'latitude' must be a number "
    } else if (typeof longitude !== 'number') {
        errorMessage = "Invalid Input: 'longitude' must be a number"
    }
    if (errorMessage) {
        return res.status(400).json({ error: errorMessage });
    }

    next();
}

module.exports = { validateSchoolData };