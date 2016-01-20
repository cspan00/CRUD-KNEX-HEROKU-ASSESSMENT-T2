var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var should = chai.should();
var server = require('../app');
var knex = require('../db/knex');
chai.use(chaiHttp);


describe('Posts CRUD Routes', function() {
  beforeEach(function () {
    return knex.seed.run(knex.config);
  });
  xit('should list ALL posts on /posts GET', function (done) {
    chai.request(server)
    .get('/posts')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.SUCCESS.should.have.length(3);
      res.body.SUCCESS[0].should.have.property('id');
      res.body.SUCCESS[0].should.have.property('author');
      res.body.SUCCESS[0].should.have.property('body');
      done();
    });
  });
  xit('should POST a SINGLE post to /posts', function(done) {
    var thePost = {
      'author': 'J.D Salinger',
      'body': 'I like it when somebody gets ecited about something. It\'s nice.'
    }
    chai.request(server)
      .post('/posts')
      .send(thePost)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.SUCCESS.should.have.length(4);
        done();
      });
    });
  xit('should GET a SINGLE post from /posts/:id', function(done) {
    chai.request(server)
      .get('/posts')
      .end(function (err, res) {
        var thePost = res.body.SUCCESS[0];
        chai.request(server)
        .get('/posts/' + thePost.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.SUCCESS.author.should.equal(thePost.author);
          res.body.SUCCESS.body.should.equal(thePost.body);
          done();
        });
      })
    });

    xit('should GET edit route /posts/:id/edit', function (done) {
      chai.request(server)
      .get('/posts/3/edit')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
    xit('should UPDATE a SINGLE post to /posts/:id', function(done) {
      chai.request(server)
        .get('/posts')
        .end(function (err, res) {
          var thePost = res.body.SUCCESS[0];
          chai.request(server)
          .post('/posts/' + thePost.id)
          .send({ author: '“Coco” Chanel'})
          .end(function(err, response){
            response.should.have.status(200);
            res.body.SUCCESS.should.have.length(3);
            done();
          });
        })
    });
    xit('should DELETE a SINGLE post at /posts/:id/delete', function(done) {
      chai.request(server)
        .get('/posts')
        .end(function (err, res) {
          var thePost = res.body.SUCCESS[0];
          chai.request(server)
          .post('/posts/'+thePost.id+'/delete')
          .end(function(err, response){
            response.should.have.status(200);
            response.body.SUCCESS.should.have.length(2)
            done();
          });
        })
    });
});
