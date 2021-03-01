var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
const mockAPIResponse = require('./mockAPI.js')
const dotenv= require('dotenv')
dotenv.config();
const fetch = require('node-fetch')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/data', (req,res) =>{
    const apiKey= process.env.API_KEY
    const baseURL= 'https://api.meaningcloud.com/sentiment-2.1?key='
    const restURL= '&lang=en&model=general&url='

    urlSentiment(baseURL,apiKey , restURL,req.body.webUrl)
    .then(function(data){
        res.send({allData: data});
    })

})

const urlSentiment = async function(baseUrl, apiKey, restUrl, webUrl){
    const response = await fetch(baseUrl+apiKey+restUrl+webUrl)
    try{
        const data = await reposnse.json();
        return data;
    } catch(error){
        console.log("ERROR: " + error);
    }
}

module.exports = {urlSentiment}
