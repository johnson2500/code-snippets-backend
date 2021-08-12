import { Pool } from 'pg';

export default class PostgresHelper {
  constructor(posrtgresURI) {
    this.posrtgresURI = posrtgresURI;
    this.pool = null;
  }

  async executeQuery(sql) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, res) => {
        console.log(sql);
        try {
          if (err) {
            console.log(err.message);
            return reject(err);
          }

          return resolve(res.rows);
        } catch (error) {
          return reject(error.message);
        }
      });
    });
  }

  connect() {
    console.log(this.posrtgresURI);
    this.pool = new Pool({
      connectionString: this.posrtgresURI,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
}
