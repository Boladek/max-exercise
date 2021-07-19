const{ Pool} = require('pg');

const pool = new Pool();

module.exports = {
    async query(text, param) {
        const start = Date.now();
        try{
            const res = await pool.query(text, param);
            const duration = Date.now() - start;
            console.log( 'executed query',  {text, duration, rows: res.rowCount} );
            return res;
        }catch(error){
            console.log('error in query', {text});
            throw error;
        }
    }
}