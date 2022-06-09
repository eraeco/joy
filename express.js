const express = require('express')
const path = require('path')
const app = express()
const port = 8765 

app.use("/",express.static(__dirname))

app.get("/test.data.json",(req,res)=>{
    res.send(JSON.stringify({time: +new Date}))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})