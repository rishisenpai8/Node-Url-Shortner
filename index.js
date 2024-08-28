const express = require('express');
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url');
const { timeStamp } = require('console');
const app = express();
const PORT = 8001;


connectToMongoDB('mongodb://0.0.0.0:27017/short-url').then(()=>console.log('MongoDB Connected'))
    
app.use(express.json())



app.use('/url', urlRoute)
app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory:{
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})

app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))