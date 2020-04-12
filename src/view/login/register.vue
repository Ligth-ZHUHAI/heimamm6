<template>
    <div class="register">
        <el-dialog :visible.sync="dialogVisible" width="600px" :show-close="false">
            <div slot="title" class="title">用户注册</div>
            <el-form :model="form"  class="form" :rules="rules" ref="form">
                <el-form-item label="头像" label-width="80px" prop="avatar">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="昵称" label-width="80px" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" label-width="80px" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>

                <el-form-item label="手机" label-width="80px" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>

                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="16">
                        <el-form-item label="图形码" label-width="80px" prop="code">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item>
                            <span class="setWidth"><img :src="codeURL" alt="" @click="changeCode"></span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="16">
                        <el-form-item label="验证码" label-width="80px" prop="rcode">
                            <el-input v-model="form.rcode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item>
                            <span class="setWidth"><el-button class="btn" @click="getRcode">获取用户验证码<span v-if="totalTime != 60">({{totalTime}})</span></el-button></span>                           
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    // 导入register接口文件
    import {getPhoneRcode} from '@/api/register.js'

    export default {
        data() {
            return {
                // 倒计时
                totalTime : 60,
                // 图形码地址
                codeURL: process.env.VUE_APP_URL + '/captcha?type=sendsms',
                // 对话框默认不显示
                dialogVisible: false,
                // 本地显示图片
                imageUrl: '',
                // 表单
                form: {
                    username:'',
                    phone:'',
                    email:'',
                    avatar:'',
                    password:'',
                    rcode:'',
                    code:'',
                },
                rules:{
                    username:[
                        {required:true, message:'输入名称',trigger:'change'},
                        {min:2, max:6, message:'输入2~6位', trigger:'change'}
                    ], 
                    email:[
                        {required:true, message:'输入名称',trigger:'change'},
                        {validator:(rule,value,callback)=>{
                            let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                            if(_reg.test(value)){
                                callback()
                            }else{
                                callback('输入正确邮箱')
                            }
                        }}
                    ],
                    phone:[
                        {required:true,message:'输入手机号',trigger:'change'},
                        {
                            validator:(rule, value, callback)=>{
                                let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                                if(_reg.test(value)){
                                    callback()
                                }else{
                                    callback('输入正确手机号')
                                }
                            }
                        }
                    ], 
                     password:[
                        {required:true, message:'输入密码',trigger:'change'},
                        {min:6, max:8, message:'输入6~8位', trigger:'change'}
                    ], 
                     code:[
                        {required:true, message:'图形码',trigger:'change'},
                        {min:4, max:4, message:'输入4位图形码', trigger:'change'}
                    ],
                    rcode:[
                        {required:true, message:'验证码',trigger:'change'},
                        {min:4, max:4, message:'输入4位验证码', trigger:'change'}
                    ],                      
                }
            }
        },
        methods: {
            // 获取验证码           
            getRcode(){
                let _pass = true;
                this.$refs.form.validateField(['code','phone'], err=>{
                    if(err != ''){
                        _pass = false;
                    }
                })
                if(_pass == false){
                    return;
                }else{
                    // 设置倒计时
                    this.totalTime--
                    let timeId = setInterval(()=>{
                        this.totalTime--
                        if(this.totalTime <= 0){
                            clearInterval(timeId);
                            this.totalTime = 60
                        }
                    },1000)
                    // 使用register接口
                    getPhoneRcode({code:this.form.code,phone:this.form.phone}).then(res=>{
                        console.log(res);
                        this.$message.success(res.data.data.captcha+'')
                    })
                }
            },
            // 获取图形码
            changeCode(){
                this.codeURL = process.env.VUE_APP_URL + '/captcha?type=sendsms&t='+Date.now(); 
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style lang="less" scop>
    .register {

        .title {
            width: 600px;
            height: 53px;
            line-height: 53px;
            background: rgb(2, 191, 248);
            text-align: center;
            font-size: 18px;
            font-weight: 400;
            color: rgba(254, 254, 254, 1);
        }


        .el-dialog__header {
            padding: 0;
        }

        .setWidth {
            width: 143px;
            height: 41px;

            img,.btn {
                width: 100%;
            }
        }

        .el-dialog__footer {
            text-align: center;
        }

    }
</style>
<style lang="less" scop>
    .register {
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader {
            text-align: center;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>