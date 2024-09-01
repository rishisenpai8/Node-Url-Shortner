const express = require('express');
const {connectToMongoDB} = require('./connect')
const cookieParser = require('cookie-parser')
const path = require('path');
const {restrictToLoggedinUserOnly, checkAuth} = require ('./middlewares/auth')
const URL = require('./models/url');

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

// const { timeStamp } = require('console');
const app = express();
const PORT = 8001;


connectToMongoDB('mongodb://0.0.0.0:27017/short-url').then(()=>console.log('MongoDB Connected'))
    
app.set("view engine", "ejs")
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())


app.get('/', async(req,res)=>{
    const allUrls =  await URL.find({});
    return res.render('home',{
        urls: allUrls
    })
})

app.use('/url',restrictToLoggedinUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/', checkAuth, staticRoute)


app.get('/url/:shortId', async (req,res)=>{
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