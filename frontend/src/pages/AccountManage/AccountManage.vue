<template>
    <div class="box">
        <div class="box-head">
            <el-button @click="handleAddAccount()" type="primary" style="margin-right: 10px;">添加账号</el-button>
        </div>
        <div class="box-content">
            <el-table :data="tableData" height="calc(100vh - 200px)">

                <el-table-column type="index" label="id"></el-table-column>
                <el-table-column label="用户名" property="account"></el-table-column>
                <el-table-column label="密码" property="password"></el-table-column>
                <el-table-column label="创建时间">
                    <template #default="{ row }">
                        <el-tag color="arcoblue">{{ Utils.formatDate(row.createTime) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" property="title">
                    <template #default="{ row }">
                        <el-tag color="arcoblue">{{ Utils.formatDate(row.updateTime) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="uuid" property="uuid"></el-table-column>

                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="handleEditAccount(row)" type="primary">编辑</el-button>

                        <el-popconfirm title="确定要删除吗？" position="top" @confirm="handleDeleteAccount(row)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>


                    </template>
                </el-table-column>


            </el-table>
        </div>
        <div class="box-bottom">
            <el-pagination :total="page.total" v-model:page-size="page.size" v-model:current-page="page.current"
                @change="handlePageChange" @page-size-change="handlePageSizeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Utils } from '../../utils/Utils'
import type { Account } from '@/model/Account.ts'
import { AccountManageApi } from '@/api/AccountManageApi'
import { ElMessage } from 'el-cool'
import { useStore } from '@/store/index'
import { Page } from "@/model/Page.ts"

const store = useStore()
// 数据
const router = useRouter()
const tableData = ref<Array<Account>>([{
    account: 'wangxing',
    password: 'wangxing',
    uuid: 'wangxing',
    createTime: 'wangxing',
    updateTime: 'wangxing',
}])

const page = ref<Page>(new Page())
// 生命周期
onMounted(() => {
    queryAccountList()
})

// 方法
const handleAddAccount = () => {
    router.push({
        name: 'AccountEdit',
        params: {
            uuid: 'CreateAccount'
        }
    })
}

const queryAccountList = (current: number = 1) => {
    page.value.current = current
    AccountManageApi.queryAccountList({
        current: current,
        size: page.value.size
    }).then(res => {
        tableData.value = res.data.records || []
        page.value.total = res.data.total
    }).catch(err => {
        ElMessage.error(err?.message || '查询账号失败！')
    })
}

const handleEditAccount = (par: Account) => {
    router.push({
        name: 'AccountEdit',
        params: {
            uuid: par.uuid
        }
    })
}
// 删除账号
const handleDeleteAccount = (par: Account) => {
    let params = {
        uuid: par.uuid
    }
    AccountManageApi.deleteAccount(params).then(res => {
        ElMessage.success('删除账号成功！')
        queryAccountList()
    }).catch(err => {
        ElMessage.error(err?.message || '删除账号失败！')
    })
}

const handlePageChange = (current: number) => {
  
    queryAccountList(page.value.current)
}
const handlePageSizeChange = (size: number) => {
   
    queryAccountList()
}
</script>

<style lang="scss" scoped>
.box {
    .box-head {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .box-content {
        margin-left: 30px;
        margin-top: 30px;

        .arco-table {
            max-height: calc(100vh - 200px);
            overflow: auto;
        }
    }

    .box-bottom {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
}
</style>