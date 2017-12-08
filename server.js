const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const {posts, comments} = require('./routes') 

// Creating vars
let store = {
    "posts": [
      {"name": "Top 10 ES6 Features every Web Developer must know",
      "url": "https://webapplog.com/es6",
      "text": "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
      "comments": [ 
        {"text": "Cruel…..var { house, mouse} = No type optimization at all"},
        {"text": "I think you’re undervaluing the benefit of ‘let’ and ‘const’."},
        {"text": "(p1,p2)=>{ … } ,i understand this ,thank you !"      
        }
      ]
      }
    ]
  }

let app = express()

// Middleware
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
// Adding the store to the request object
const addStoreToRequest = (request, response, next) => {
    request.store = store;
    next();
  }
app.use(addStoreToRequest);

// Routes
app.get('/', (req, res)=>{
    res.send('Invalid route');
  });

// Routes at posts.js
app.get('/posts', posts.getPosts)
app.post('/posts', posts.addPost)
app.put('/posts/:postId/', posts.updatePost)
app.delete('/posts/:postId/', posts.removePost)

// Routes at comments.js
app.get('/posts/:postId/comments', comments.getComments)
app.post('/posts/:postId/comments', comments.addComment)
app.put('/posts/:postId/comments/:commentId', comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', comments.removeComment)

app.listen(3000)