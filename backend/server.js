const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });


const connection = mongoose.connection;
connection.once('open', function(){
    console.log("Mongodb database connection established succesfully");
});

app.use('/users', require('./routes/users'));
app.use('/excersice', require('./routes/excersice'))

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
