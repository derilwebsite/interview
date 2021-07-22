const express = require('express');
const app = express();
require('../Mongodb/Mongodb')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
    })
  );


app.use('/api',require('./Router/User/User'))


app.listen(5000,()=>{
    console.log('running')
})