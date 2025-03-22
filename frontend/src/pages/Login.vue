<template>
    <div class="login-box">
        <el-card class="login-card">
            管理后台登录
            <el-form ref="formRef" :model="form" style="margin-top: 20px;">
                <el-form-item prop="account" label="账号" :rules="[FormRules.Required()]">
                    <el-input v-model="form.account" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password" label="密码" :rules="[FormRules.Required()]">
                    <el-input type="password" show-password ref="inputRef" v-model="form.password"
                        placeholder="请输入密码" />
                </el-form-item>
            </el-form>
            <div class="login-actions">
                <el-button type="primary" @click="handleSubmit">登录</el-button>
            </div>

        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';
import { FormRules } from '@/utils/ComponentUtils'
import { LoginApi } from '@/api/Login';
import { ElMessage } from 'el-cool';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store';
import { ElForm } from 'el-cool';


const router = useRouter()
const store = useStore()
const formRef = useTemplateRef('formRef')

const inputRef: any = ref(null)
const form: any = reactive({
    account: '',
    password: '',
});

const handleSubmit = () => {
    if (!formRef.value) {
        return
    }
    formRef.value.validate((flag) => {
        if (!flag) {
            return
        }
        const params = {
            account: form.account,
            password: form.password,
        }
        LoginApi.login(params).then(res => {

            store.userStore.setUser(res.data.user)
            localStorage.setItem('token', res.data.token)
            router.push({
                name: 'List'
            })
        }).catch(err => {

            ElMessage.error(err.message || '失败')
        })

    })
}
</script>

<style lang="scss" scoped>
@use "../styles/var";

.login-box {
    background-image: url("/frontend/assets/mountain.jpg");
    height: 100%;
    background-size: cover;
    display: flex;
    justify-content: center;

    .el-card {
        background-color: var.$blue-1;
        width: 500px;
        margin-top: 30vh;
        height: 220px;

        .login-actions {
            display: flex;
            justify-content: center;
        }
    }
}
</style>