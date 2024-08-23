const validateSchoolData = (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data. All fields are required and must be correctly formatted.' });
    }

    next();
}

module.exports = { validateSchoolData };