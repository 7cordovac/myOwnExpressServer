var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
   knex.raw('SELECT * from bikes')
   .then (function(payload){
      //DONT TOUCH BIKES BELOW
      res.render('bikes/index', {bikes: payload.rows});
   });
});

//*Post home page   this works
router.post('/', function(req, res, next) {
   knex.raw(`INSERT into bikes (name) VALUES ('${req.body.name}')`)
   .then (function(){
      res.redirect('/bikes');
   });
});

/* GET one. */
router.get('/:id/edit', function(req, res, next) {
   knex.raw(`SELECT * from bikes WHERE id = '${req.params.id}'`)
   .then (function(payload){
      res.render('bikes/edit', {bikes: payload.rows[0]});
   });
});


//riders submit changes
router.post('/:id', function(req, res, next) {
   knex.raw(`UPDATE bikes SET
      name = '${req.body.name}',
      WHERE id = ${req.body.id}`)
      .then (function(payload){
   res.redirect ('/bikes');
});
});

//ADD NEW rider  Add new rider works
router.get('/new', function(req, res, next) {
   res.render('bikes/new');
});


module.exports = router;
