const express = require('express');
const path = require('path');

// Instead of defining all of the controllers in this file, we've moved them to their own folder
const {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
} = require('./controllers/fellowControllers');

const { createPost, servePosts, servePost, servePostsByFellow, deletePost } = require('./controllers/postControllers');

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);

// A new middleware has appeared! 
// This parses incoming requests with JSON data in the body
// Access the data using `req.body`
const parseJSON = express.json();

app.use(logRoutes);   // Print out every incoming request
app.use(serveStatic); // Serve static public/ content
app.use(parseJSON);   // Parses request body JSON

////////////////////////
// Endpoints
////////////////////////

app.get('/api/fellows', serveFellows);
app.get('/api/fellows/:id', serveFellow);
app.post('/api/fellows', createFellow);
app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);

app.post('/api/posts', createPost);
app.get('/api/posts', servePosts);
app.get('/api/posts/:id', servePost);
app.get('/api/fellows/:fellowId/posts', servePostsByFellow);
app.delete('/api/posts/:id', deletePost);


app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));