const {nanoid} = require('nanoid')
const URL = require('../models/url')

async function handleGenrateNewShortURL(req,res){
    const body = req.body;

    if(!body.url) return res.status(400).json({error: 'Url is required'})

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[]
    })
}