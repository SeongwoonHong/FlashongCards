const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Routes = require('./routes');
const dotenv = require('dotenv');

class App {
  constructor() {
    this.expressApp = express();
    
    this.config = {
      get port() {
        return process.env.PORT || 5000;
      }
    }
    this.applyMiddleware();
  }
  
  applyMiddleware() {
    dotenv.config();
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(cors());

    new Routes(this.expressApp);
  }

  run() {
    this.expressApp.listen(this.config.port, () => {
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Express server running on port ${this.config.port}`);
    })
  }
}

module.exports = new App();
