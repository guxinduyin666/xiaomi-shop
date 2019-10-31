module.exports = {
    productionSourceMap:true,
    devServer:{
        port:8888,
        proxy:'http://127.0.0.1:3000'
    },
    css:{
        extract:true
    },
    pwa:{
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
    }
}