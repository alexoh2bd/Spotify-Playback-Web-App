require('dotenv').config();


const express = require('express');
const spotifyWebAPI = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parses url parameters in get request


app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new spotifyWebAPI({
        redirectUri: process.env.REDIRECT_URI, 
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })
        // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
    
  
})

app.post('/login', (req, res) => {// move into env file, not secure
    const code = req.body.code
    const spotifyAPI = new spotifyWebAPI({
        redirectUri: 'http://localhost:3000', 
        redirectUri: process.env.REDIRECT_URI, 
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,

    })
    spotifyAPI
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
            
        }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
})

app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No lyrics Found"
    res.json({ lyrics })
})


app.listen(3001)