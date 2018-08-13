'use strict';

const express = require('express');
const request = require('request-promise');
const app = express();

const options = {
    method: 'GET',
    uri: 'https://www.olx.ua/obyavlenie/so-dimm-ddr3l-ddr3-4gb-1600-mhz-samsung-adata-elixir-IDApFh6.html?sd=1#627eb08d0e',
    headers:{
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        referer: 'https://www.olx.ua/',
        'upgrade-insecure-requests': 1,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9,uk;q=0.8,ru;q=0.7',
        'cache-control': 'max-age=0',
    }
};

request(options).then(data=>{console.log(data.indexOf('Просмотры'))}).catch();

app.get(/api/,(req, res)=>{
    const uri = req.query.uri;
    // res.end()
});

app.listen(8080);

