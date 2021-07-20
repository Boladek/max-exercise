const{ Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

// pool
//   .query('SELECT * FROM users WHERE id = $1', [1])
//   .then(res => console.log('user:', res.rows[0]))
//   .catch(err =>
//     setImmediate(() => {
//       throw err
//     })
//   )

module.exports = pool;

// module.exports = {
//     async query(text, param) {
//         const start = Date.now();
//         try{
//             const res = await pool.query(text, param);
//             const duration = Date.now() - start;
//             console.log( 'executed query',  {text, duration, rows: res.rowCount} );
//             return res;
//         }catch(error){
//             console.log('error in query', {text});
//             throw error;
//         }
//     }
// }