'use strict';

const express = require('express');
const request = require('request-promise');
const app = express();

const options = {
    method: 'GET',
    uri: 'https://www.olx.ua/uk/detskiy-mir/igrushki/'
};

request(options).then(data=>{console.log(data)}).catch();

app.get(/api/,(req, res)=>{

});

app.listen(8080);

