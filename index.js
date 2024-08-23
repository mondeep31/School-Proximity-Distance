


const express = require("express");
const app = express();
const schoolRoutes = require("./routes/schoolRoutes");
require('dotenv').config();

app.use(express.json());

app.use("/api/v1", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})