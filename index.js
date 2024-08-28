// connectToMongoDb('mongodb://0.0.0.0:27017/short-url')
const express = require('express');
const PORT = 8001;

const app = express;




app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))