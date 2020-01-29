const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
// with no params/args given to cors, anyone can access from any domain
app.use(express.static('public'));
a
