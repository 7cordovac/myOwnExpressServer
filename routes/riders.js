var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
/* GET home page. */
router.get('/', function(req, res, next) {
   knex.raw('SELECT * from riders')
   .then (function(payload){
      //dont touch riders below
      res.render('riders/index', {riders: payload.rows});
   });
});

//*Post home page   this works
router.post('/', function(req, res, next) {
   knex.raw(`INSERT into riders (first_name) VALUES ('${req.body.first_name}')`)
   .then (function(){
      res.redirect('riders');
   });
});


/* GET one. */
router.get('/:id/edit', function(req, res, next) {
   knex.raw(`SELECT * from riders WHERE id = '${req.params.id}'`)
   .then (function(payload){
      //dont touch riders below
      res.render('riders/edit', {riders: payload.rows[0]});
   });
});

//riders submit changes
router.post('/:id', function(req, res, next) {
   knex.raw(`UPDATE riders SET
      first_name = '${req.body.first_name}',
      last_name = '${req.body.last_name}',
      bicycle_id = ${Number(req.body.bicycle_id)}
      WHERE id = ${req.body.id}`)
      .then (function(payload){
   res.redirect ('/riders');
});
});




//ADD NEW rider
router.get('/new', function(req, res, next) {
   res.render('riders/new');


});

module.exports = router;
