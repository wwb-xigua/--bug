import OSS from './OSS.jsx';
import { App, CTYPE } from "./index";

let OSSWrap = {
    upload: function (file, options = {}) {
        return App.api('usr/file/upload_token', {
            namespace: options.namespace || 'file',
            fileName: file.name,
            fileSize: file.size
        }).then(function (cfg) {
            let client = new OSS({
                region: cfg.region,
                accessKeyId: cfg.accessKey,
                accessKeySecret: cfg.accessSecret,
                stsToken: cfg.stsToken,
                bucket: cfg.bucket
            });
            return client.multipartUpload(cfg.key, file, options).then(function () {
                return { 'vendor': 'ali', 'bucket': cfg.bucket, 'key': cfg.key, 'url': cfg.url };
            });
        });
    }
};

export default OSSWrap;
