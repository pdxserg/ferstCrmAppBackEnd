const express = require('express')
const app = express()
const port = 5000

app.get('/', (req:any, res:any) => {
    res.send('Hello World!!!12')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})