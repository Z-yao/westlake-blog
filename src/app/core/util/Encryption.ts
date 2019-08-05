import CryptoJS from 'crypto-js'
// 3DES加密和解密
const encryptByDES = (message, key)=>{
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        iv: CryptoJS.enc.Utf8.parse(''),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};
const decryptByDES=(ciphertext, key)=>{
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        iv: CryptoJS.enc.Utf8.parse(''),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
// base64，hex的相互转化
const secEncryptByDES = (message)=>{
    let base64Str=encryptByDES(message, '3gfNoZOCAnWJu94RfiNNop5O');
    let hex=CryptoJS.enc.Base64.parse(base64Str);
    let hexstr=CryptoJS.enc.Hex.stringify(hex)
    return hexstr
}
// 对外请求相应解密接口
const secDecryptByDES = (datastr)=>{
    let hex=CryptoJS.enc.Hex.parse(datastr)
    let base64Str=CryptoJS.enc.Base64.stringify(hex)
    let mmm=decryptByDES(base64Str, '3gfNoZOCAnWJu94RfiNNop5O');
    return mmm
}
// 对外请求加密接口
/**
 * @httpDefaultOpts (Object): axios请求配置，{url,params,data,headers}
 *      @url (string): 请求url，不需带域名
 *      @params (string):  
 *      @data (string): 
 *      @headers (string): 请求头
 */
const dealReqOpt=(httpDefaultOpts)=>{
    let urlTop= httpDefaultOpts.url.split("?")[0];
    let arr=!!httpDefaultOpts.url.split("?")[1]?httpDefaultOpts.url.split("?")[1].split("&"):[]
    let obj = {};
    for (let i of arr) {
        obj[i.split("=")[0]] = i.split("=")[1];
    }
    let sunParams=Object.assign({},obj,httpDefaultOpts.params);
    let readyURL=[];
    for(let [key, value] of Object.entries(sunParams)){
        readyURL.push(`${key}=${value}`);
    }
    let hexStr=readyURL.length>0?secEncryptByDES(readyURL.join('&')):'';
    let pinjie='';
    if(!!hexStr) pinjie=`?${hexStr}`;
    httpDefaultOpts.url=`${urlTop}${pinjie}`;
    httpDefaultOpts.params=null;
    httpDefaultOpts.data=!!httpDefaultOpts.data?secEncryptByDES(JSON.stringify(httpDefaultOpts.data)):null;
    httpDefaultOpts.headers.deviceType='H5';
}
export {
    secDecryptByDES ,dealReqOpt
}