<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt="">
        <span class="name">黑马面面</span>
        <span class="line"> | </span>
        <span class="userLogin">用户登录</span>
      </div>
      <div class="form">
        <el-form :model="form">
          <el-form-item>
            <el-input placeholder="输入账号" prefix-icon="el-icon-user" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="输入密码" prefix-icon="el-icon-lock" :show-password="true" v-model="form.passWord">
            </el-input>
          </el-form-item>
          <el-row>
            <el-col :span="16">
              <el-form-item>
                <el-input placeholder="输入验证码" v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <span class="code"><img :src="codeURL" alt=""></span>
            </el-col>
          </el-row>
          <el-form-item>
            <el-checkbox>
              <div class="context">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link>
              </div>
            </el-checkbox>
          </el-form-item>
        </el-form>
      </div>

      <div class="btn">
        <el-button type="primary" class="btn-first">登录</el-button><br>
        <el-button type="primary" class="btn-second">注册</el-button>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        // 验证码地址
        codeURL :process.env.VUE_APP_URL+'/captcha?type=login',
        form: {
          username: '',
          passWord: '',
          code: '',
        }
      }
    },
    created(){
      console.log(process.env.VUE_APP_URL);
    }
  }
</script>

<style lang="less">
  .login {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1400px;
    height: 788px;
    background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
    width: 100%;
    height: 100%;

    .left {
      width: 478px;
      height: 550px;
      background: rgba(245, 245, 245, 1);
      padding: 40px;

      .title {
        margin-bottom: 38px;

        .name {
          font-size: 24px;
          font-weight: 400;
          color: rgba(12, 12, 12, 1);
          margin-left: 16px;
          margin-right: 16px;
        }

        .line {
          color: rgba(199, 199, 199, 1);
        }

        .userLogin {
          font-size: 22px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(12, 12, 12, 1);
          margin-left: 16px;
        }
      }

      .form {
        .code {
          width: 110px;
          height: 42px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .context {
          font-size: 14px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 16px;
        }
      }
      .btn {

        .btn-first,.btn-second {
          width: 100%;
        }
        
        .btn-first {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>