const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxe81b9f3424b93608',
    // 微信小程序 App Secret
    appSecret: '055d1f0c9b4417a71cf464e1a8269d71',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '123456',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 区域
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'wximg',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,

    serverHost: '192.168.126.133',
    tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    qcloudAppId: '1252832257',
    qcloudSecretId: 'AKIDthKn6EMMG0c3MUiBsRpCPRJNGxTob2vc',
    qcloudSecretKey: 'kT2QehZK3byAC4lGaikcLtHZkniU7czD',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF) : CONF;
