const  { createProxyMiddleware } = require('http-proxy-middleware');


module.exports=function(app){
    app.use(
        ["/search/site","/airport"],
        createProxyMiddleware({
            target:"https://skyvector.com",
            changeOrigin:true
        })
    );
};