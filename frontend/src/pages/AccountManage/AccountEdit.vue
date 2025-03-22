<template>
    <div class="box">
        <div class="form-content">
            <el-form ref="formRef" :model="form" :style="{ width: '600px' }" @submit="handleSubmit" :rules="rules">
                <el-form-item prop="account" tooltip="请输入用户名" label="用户名">
                    <el-input v-model="form.account" placeholder="请输入用户名..." />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password" placeholder="请输入密码..." />
                </el-form-item>
                <el-form-item prop="copyPassword" label="确认密码">
                    <el-input v-model="form.copyPassword" placeholder="请再次确认密码..." />
                </el-form-item>



            </el-form>
        </div>

        <div class="form-actions">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button type="info">取消</el-button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed, useTemplateRef } from 'vue'
import type { Account } from '@/model/Account'
import { FormRules } from '@/utils/ComponentUtils'
import { AccountManageApi } from '@/api/AccountManageApi'
import { useRouter, useRoute } from 'vue-router'
import { ElForm } from 'el-cool'
import { ElMessage } from 'el-cool'


const router = useRouter()
const route = useRoute()

interface Form extends Account {
    copyPassword: string
}

const rules = computed(() => {
    return {
        account: [FormRules.Required()],
        password: [FormRules.Required()],
        copyPassword: [FormRules.Required()],
    }
})

const form = ref<Form>({
    account: '',
    password: '',
    createTime: '',
    updateTime: '',
    uuid: '',
    copyPassword: ''
})
const formRef = useTemplateRef('formRef')
const isEdit = ref(false)

onMounted(() => {
    const uuid = route.params.uuid as string
    if (uuid !== 'CreateAccount') {
        isEdit.value = true
        form.value.uuid = uuid
        queryAccount()
    }
})

const handleSubmit = () => {
    if (!formRef.value) {
        return
    }
    // 先校验表单
    formRef.value.validate(flag => {
        if (!flag) {
            return
        }

        if (form.value.password !== form.value.copyPassword) {
            ElMessage.warning('两次输入密码不一致!')
            return
        }
        // 二次弹窗确认
        isEdit.value ? editAccount() : addAccount()
    })
}

const queryAccount = () => {
    AccountManageApi.queryAccountByUuid(form.value.uuid).then(res => {
        form.value = {
            ...res.data,
            copyPassword: ''
        }
    }).catch(err => {
        ElMessage.error(err.message)
    })
}

const editAccount = () => {
    AccountManageApi.editAccount({
        uuid: form.value.uuid,
        password: form.value.password,
    }).then(res => {
        ElMessage.success('修改密码成功！请重新登陆')
        localStorage.setItem('token', '')
        router.push('/login')
    }).catch(err => {
        ElMessage.error(err?.message || '修改账号失败！')
    })
}

const addAccount = () => {
    AccountManageApi.addAccount({
        username: form.value.account,
        password: form.value.password,
    }).then(res => {
        ElMessage.success('添加账号成功！')
        router.push('/Menu/AccountManage')
    }).catch(err => {
        ElMessage.error(err?.message || '添加账号失败！')
    })
}
</script>

<style lang="scss" scoped>
.box {


    .form-content {
        margin: 150px 0 0 100px;
        display: flex;
        justify-content: flex-start;
    }

    .form-actions {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 100px;
    }
}
</style>