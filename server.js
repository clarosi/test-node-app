const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

// Set up port for server to listen on
const port = process.env.PORT;

// Create a server
const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_LOCAL_URI, {useNewUrlParser: true})
.then(() => {
  console.log('*** Connected to MongoDB database. ***');
  // Run the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})
.catch(err => {
  console.log('*** Failed to connect in MongoDB database. ***');
  console.log(err.message);
});
// Remove deprecation warnings in mongoose
mongoose.Promise = global.Promise;