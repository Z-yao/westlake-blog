import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

    constructor(
        private apiService: ApiService, 
        private http: HttpClient) { }
      
      /**
       * @description 用户注册接口
       * @param registerUser 用户的注册信息
       */
      registerByMobile(registerUser) {
        return this.apiService.post('/user/registerByMobile/', registerUser)
      }
      
      /**
       * @description 用户登录接口
       * @param loginUser 用户登录信息
       */
      mobileLogin(loginUser) {
        return this.apiService.post('/user/mobileLogin/', loginUser)
      }
      
      /**
       * @description 发送手机验证码接口
       * @param mobile {string} 手机号码
       */
      sendRegisterVerifyCode(mobile) {
        return this.apiService.post('/user/sendRegisterVerifyCode/', mobile)
      }
}