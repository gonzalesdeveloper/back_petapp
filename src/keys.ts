export default{
    /* LOCAL */
    /* database:{
        host: 'localhost',
        user: 'pet_user',
        password: 'mG.7s9NgIv0zrqCs',
        database: 'pet_base'
    }, */
    /* WEB produccion */
    /* database:{
        host: 'switchyard.proxy.rlwy.net',
        user: 'backend_user',
        password: '636h435g475875VDA839y4',
        database: 'railway'
    }
 */
    /* WEB local */
    database:{
        host: 'switchyard.proxy.rlwy.net',
        port: 26439,
        user: 'root',
        password: 'qEEVRYRGxlQdahvyypGaUGvvzUxsqOSs',
        database: 'railway',
        ssl: {
            rejectUnauthorized: false // 👈 evita errores de certificados en conexiones seguras
        }
    }
}