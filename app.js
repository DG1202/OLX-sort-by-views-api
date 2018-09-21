'use strict';
const express = require('express');
const request = require('request-promise');
const fs = require('fs');
const app = express();
app.use(express.static("stat"))
const options = {
  method: 'GET',
  headers:{
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    referer: 'https://www.olx.ua/',
    'upgrade-insecure-requests': 1,
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9,uk;q=0.8,ru;q=0.7',
    'cache-control': 'max-age=0',
  }
};
app.use(express.static("stat"))
const getViewsCount = text => {
  const start = text.indexOf('<div class="pdingtop10">')+ 2;
  return text.substring(text.indexOf(('<strong>') , start) + 8 , text.indexOf('</strong>', start ));
};

const parse = text => {
  const result = [];
  const word = '<h3 class="lheight22 margintop5">';
  let pos = text.indexOf(word);

  while(pos > 0){
    const url = text.substring(text.indexOf('href="',pos) +6  ,text.indexOf('" class',pos) );
    const name = text.substring(text.indexOf('g>',pos) +2 , text.indexOf('</strong>',pos ));
    result.push( {url,name} );
    pos = text.indexOf(word, pos + 1);
  }
  return result
};

app.get('/', (req, res) => {
  res.end(fs.readFileSync('./index.html'))
})

app.get(/api/,(req, res)=>{
  const PromiseItemsList = [];
  for (let i = 1; i < req.query.pages; i++){
    const uri = req.query.uri+'?page='+i;
    console.log(uri);
    PromiseItemsList.push(request(Object.assign({uri:uri}, options)).then(data=>parse(data)))
  }

  Promise.all(PromiseItemsList).then(itemArrays => {
    let result = [];

    for (let i = 0; i < 2; i++){
      result = result.concat(itemArrays[i])
    }
    console.log(result);
    const PromiseList = [];
    result.forEach(item=>{
      PromiseList.push(request(Object.assign({uri:item.url}, options)))
    });

    Promise.all(PromiseList).then(viewsCount => {
      for (let i = 0;i < viewsCount.length;i++){
        result[i].views = getViewsCount(viewsCount[i])
      }
      result.sort((a,b)=>b.views - a.views);
      res.json(result)
    }).catch()
  }).catch();
});

app.listen(8080);
