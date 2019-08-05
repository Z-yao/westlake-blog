import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { getBubble, getWave } from '../../core/models/animate'
import { LoginInfo, RegisterInfo } from '../../core/models/login.model'
import { LoginService } from '../../core/services/login.service'
import { NzMessageService } from 'ng-zorro-antd'
import { StorageLib } from '../../core/util/StorageLib'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginInfo: LoginInfo = {
        mobile: '',
        password: ''
    }
    registerInfo: RegisterInfo = {
        mobile: '',
        verfifyNum: '',
        password: '',
        confirmPassword: ''
    }

    constructor(private loginService: LoginService, private message: NzMessageService, public router: Router) { 

    }

    /**
     * 登录
     */
    login() {
        this.loginService.mobileLogin({...this.loginInfo}).subscribe(res => {
            if (res.code == 0) {
                StorageLib.setItem('userId', res.data.id)
                this.message.success('登录成功')
                this.router.navigate([''])
              } else {
                this.message.warning(res.errorMessage)
              }
          },
          error => {
              this.message.error(error.errorMessage)
          });
    }

    /**
     * 发送验证码
     */
    sendVerifyCode() {
        this.loginService.sendRegisterVerifyCode({mobile: this.registerInfo.mobile}).subscribe(res => {
            if (res.code == 0) {
              this.message.success(res)
            } else {
              this.message.error(res.errorMessage)
            }
        },
        error => {
            this.message.error(error)
        });
    }

    /**
     * 注册
     */
    register() {
        this.loginService.registerByMobile({...this.registerInfo}).subscribe(res => {
            if (res.code == 0) {
              this.message.success(res)
            } else {
              this.message.warning(res.errorMessage)
            }
        },
        error => {
            this.message.error(error.errorMessage)
        });
    }

    ngOnInit() {
        getBubble()
        getWave()
    }
}

