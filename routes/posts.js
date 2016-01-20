var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Posts(){
  return knex('posts')
}

function Comments(){
  return knex('comments')
}



router.get('/', function(req, res, next) {
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.post('/', function(req, res, next){
  Posts().insert(req.body).then(function(result){
    res.redirect('/')
  })
})

router.get('/:id', function(req, res, next){
  Posts().where('id', req.params.id).then(function(posts){
    res.json({'SUCCESS': posts[0]})

  })

})

router.get('/:id/edit', function(req,res,next){
  Posts().where('id', req.params.id).then(function(posts){
    res.json({'SUCCESS': posts[0]})
  })
})

router.post('/:id', function(req, res, next){
  Posts().where('id', req.params.id).update(req.body).then(function(posts){
    res.redirect('/')
  })
})

router.post('/:id/delete', function(req,res,next){
  Posts().where('id', req.params.id).del().then(function(posts){
    res.redirect('/')
  })
})

router.get('/:post_id/comments', function(req, res, next) {
  Comments().where(req.params, 'post_id').then(function(comment){

    res.json({'SUCCESS': comment})
  });

});

router.post('/:post_id/comments', function(req, res, next) {
  Comments().insert(req.body).then(function(comment){

    res.redirect('/posts/'+req.params.post_id+'/comments')
  });

});

router.get('/:post_id/comments/:id', function(req,res,next){
  Comments().where('id', req.params.id).first().then(function(comment){
    console.log(comment);
    res.json({'SUCCESS': comment})
  })
})

router.get('/:post_id/comments/:comment_id/edit', function(req,res,next){
  Comments().where()('comment_id', req.params.comment_id).then(function(comment){
    res.json({'SUCCESS': comment[0]})
  })
})

router.post('/:post_id/comments/:comment_id', function(req, res, next){
  Comments().where('id', req.params.comment_id).update(req.body).then(function(comment){
    res.redirect('/posts/'+req.params.post_id+'/comments/')
  })
})

router.post('/:post_id/comments/:comment_id/delete', function(req, res, next){
  Comments().where('id', req.params.comment_id).del().then(function(comment){
    res.redirect('/posts/'+req.params.post_id+'/comments/')
  })
})

module.exports = router;
