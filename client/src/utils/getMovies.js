const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

const omdbKey = process.env.OMDB_KEY;
const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=`;

fetch(url) 
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

    