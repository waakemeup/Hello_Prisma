const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/user', require('./routes/user'))
app.use('/api/post', require('./routes/post'))

app.listen(5000, () => {
    console.log('Listening on port 5000');
})