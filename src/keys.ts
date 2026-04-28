export default{
    /* LOCAL */
    /* database:{
        host: 'localhost',
        user: 'pet_user',
        password: 'mG.7s9NgIv0zrqCs',
        database: 'pet_base'
    } */
    /* WEB local */
    database:{
        host: 'shuttle.proxy.rlwy.net',
        port: 32595,
        user: 'root',
        password: 'BEtucivWCDpklzQgzSjajJpCMaHwnVCM',
        database: 'railway',
        ssl: {
            rejectUnauthorized: false // 👈 evita errores de certificados en conexiones seguras
        }
    }
}