const mySQLConnector = require('./mysqlConnector');

module.exports = class MySQLWrapper {
  static createQuery({ query, params }) {
    return new Promise((resolve, reject) => {
      mySQLConnector.pool.getConnection((err, connection) => {
        if (err) {
          console.log('err = ', err);
          return reject(err);
        }

        connection.query(query, params, (err, rows) => {
          connection.release();

          if (err) {
            return reject(err);
          }

          return resolve(rows);
        })
      })
    })
  }

  // static getConnectionFromPool() {
  //   return new Promise((resolve, reject) => {
  //     mySQLConnector.pool.getConnection((err, connection)) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       return resolve(connection);
  //     }
  //   })
  // }
}
