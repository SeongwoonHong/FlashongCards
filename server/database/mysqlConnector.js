const mysql  = require('mysql');
require('dotenv').config();

class MySQLConnector {

  get MYSQL_DB_USER() {
    return process.env.MYSQL_DB_USER || 'root'
  }

  get MYSQL_DB_NAME() {
    return process.env.MYSQL_DB_NAME || 'flashcards'
  }

  get MYSQL_DB_PASSWORD() {
    return process.env.MYSQL_DB_PASSWORD || ''
  }

  get MYSQL_DB_ADDRESS() {
    return process.env.MYSQL_DB_ADDRESS || 'localhost'
  }

  get MYSQL_DB_POOL_SIZE() {
    return process.env.MYSQL_DB_POOL_SIZE || 10
  }

  get pool() {
    return this.internalPool;
  }

  constructor() {
    this.internalPool = mysql.createPool({
      host: this.MYSQL_DB_ADDRESS,
      user: this.MYSQL_DB_USER,
      database: this.MYSQL_DB_NAME,
      password: this.MYSQL_DB_PASSWORD,
      connectionLimit: this.MYSQL_DB_POOL_SIZE,
      waitForConnections: true
    })

    // this.establishConnection();
  }

  /**
   * when a new connection is made within the pool
   */
  establishConnection () {
    this.internalPool.on('connection', (connection) => {
      // connection.query('SET SESSION auto_increment_increment=1');
      console.log(`New connection is established with server on thread #${connection.threadId}`);
    })
  }
}

module.exports = new MySQLConnector();
