var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


function Comments(){
  return knex('comments')
}


router.get('posts/:post_id/comments', function(req, res, next) {
  Comments().where('post_id', req.params.id).then(function(comment){
    console.log(comment);
    res.json({'SUCCESS': comment[0]})
  });

});
