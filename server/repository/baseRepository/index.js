const mysql = require('../../database/mysqlWrapper');

class DAO {
  static get PRIMARY_KEY() {
    return 'id';
  }

  static async findByPrimaryKey(id) {
    const result = await mysql.createQuery({
      query: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
      params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
    });

    return result[0];
  }

  static async findAll() {
    const result = await mysql.createQuery({
      query: `SELECT * FROM ??;`,
      params: [this.TABLE_NAME]
    });

    return result;
  }

  static async findByFields({ fields, limit, order }) {
    let baseQuery = `SELECT * FROM ?? WHERE `;
    let params = [this.TABLE_NAME];

    Object.keys(fields).forEach((key, index) => {
      baseQuery += `${key} = ?`;
      params.push(fields[key]);

      if (index + 1 !== Object.keys(fields).length) {
        baseQuery += ' AND ';
      }
    });

    if (order && order !== null && order.by !== null && order.direction !== null) {
      baseQuery += ` ORDER BY ??`;
      baseQuery += (order.direction).toLowerCase() === 'desc' ? ' DESC' : ' ASC';
      params.push(order.by);
    }

    if (limit && limit !== null && !isNaN(limit)) {
      baseQuery += ' LIMIT ?';
      params.push(limit);
    }

    return await mysql.createQuery({
      query: baseQuery,
      params,
    })
  }

  static async update({ data, id }) {
    const result = await mysql.createQuery({
      query: `UPDATE ??
              SET ?
              WHERE ?? = ? AND modification_date = CURRENT_TIMESTAMP;`,
      params: [this.TABLE_NAME, data, this.PRIMARY_KEY, id]
    });

    return result;
  }

  static async insert({ data }) {
    console.log(data);
    const result = await mysql.createQuery({
      query: `INSERT INTO ${this.TABLE_NAME}
              SET ?;`,
      params: [data]
    });

    return result;
  }

  static async deleteById(id) {
    const data = await mysql.createQuery({
      query: `DELETE FROM ??
              WHERE ?? = ?;`,
      params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
    });

    return data;
  }
}

module.exports = DAO;
