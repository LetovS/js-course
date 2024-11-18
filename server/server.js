const express = require('express');
const cors = require('cors');
const app = express();
const port = 3009;

app.use(cors())
app.use(express.json())

app.post('/echo', (request, response) =>{
    console.log(request.body);
    response.json({
        name: 'test',
        lastName: 'testLastName'
    })
});

app.listen(port);