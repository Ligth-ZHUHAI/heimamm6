<template>
    <div class="register">
        <el-dialog :visible.sync="dialogVisible" width="600px" :show-close="false">
            <div slot="title" class="title">用户注册</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false
            };
        },

    };
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
    }
</style>