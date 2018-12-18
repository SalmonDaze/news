module.exports = {
    baseUrl : '/',
    devServer : {
        port: 8080,
        host: 'localhost',
        proxy:{
            '/':{
                target:'http://localhost:3000',
                changeOrigin: true,
                ws: false
            },
            '/api':{
                target:'http://localhost:3000/api',
                changeOrigin: true,
                ws: false
            }
        }
    }
}