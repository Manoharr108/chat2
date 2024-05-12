const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const port = 3000


const cors = require('cors')
app.use(cors({
    origin : "http://127.0.0.1:5500"
}))
const data = require('./public/data.json')

app.use(express.static("public"))
app.use(express.json())
 
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.post('/data',(req,res)=>{
    let result = req.body
    let file = fs.readFileSync('./public/data.json','utf-8')
    let parsedData = file ? JSON.parse(file) : []
    parsedData.push(result)
    fs.writeFileSync('./public/data.json',JSON.stringify(parsedData,null,2),'utf-8')
})


app.get('/data',(req,res)=>{
    res.send(data)
})


app.listen(port,()=>{
    console.log(`app listening on ${port}`)
})