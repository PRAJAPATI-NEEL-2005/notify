const { use } = require('react');
const connectToMongo=require('./db.js');
var cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json());
app.use(cors()) //used for json data passing in api
const port = 5000

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// available routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})