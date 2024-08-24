const express = require("express");
const path = require("path");
const app = express();
const schoolRoutes = require("./routes/schoolRoutes");
require('dotenv').config();

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use("/api/v1", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})