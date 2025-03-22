<template>
    <div class="main-page">

        <div class="page-menu">
            <div class="menu-title">
                <el-icon>
                    <Grid />
                </el-icon>
                <span style="margin-left: 8px;">
                    xx管理系统
                </span>

            </div>
            <div class="menu-item" v-for="item in menuList" :key="item.id" @click="handleMenuClick(item)">
                <div class="item-wrapper" :class="currentMenu === item.id ? 'selected-menu' : ''">
                    <component :is="item.icon" style="width: 1em;height: 1em;"></component>
                    <span class="item-text">{{ item.name }}</span>
                </div>


            </div>
        </div>

        <div class="page-content">
            <div class="content-header">
                <div class="header-left">


                </div>
                <div class="header-right">
                    <el-dropdown @select="handleSelect">
                        <el-avatar :style="{ backgroundColor: '#14a9f8' }">
                            {{ store.userStore.getUser.account.slice(0, 4) }}
                        </el-avatar>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="value">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>


            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store/index'
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'
import type { Menu } from '@/model/Menu';

const store = useStore()
const router = useRouter()
const route = useRoute()

const currentMenu = ref(1)

onMounted(() => {
    const menu = menuList.find(item => item.href.includes(route.name as string))
    if (menu) {
        currentMenu.value = menu.id
    }
})
onBeforeUnmount(() => {

})




const menuList: Array<Menu> = [
    { id: 1, name: 'xx列表', href: '/Menu/List', icon: 'Notebook' },
    { id: 2, name: '账号设置', href: '/Menu/AccountManage', icon: 'user' },
]
const handleMenuClick = (item: Menu) => {
    currentMenu.value = item.id
    router.push(item.href)
}
const handleSelect = (value: string | number | Record<string, any> | undefined) => {
    if (value === 'exit') {

        localStorage.setItem('token', '')
        router.push('/login')
    }
}
</script>

<style lang="scss" scoped>
@use "../styles/var";

.main-page {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;

    .page-menu {
        box-sizing: border-box;
        width: 160px;
        height: 100vh;
        flex-shrink: 0;
        flex-grow: 0;
        background-color: var.$gray-2;

        .menu-title {
            display: flex;
            justify-content: center;
            height: 25px;
            align-items: center;
            padding: 16px 0 16px 0;
        }

        .menu-item {
            cursor: pointer;

            .item-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 12px 0 12px 0;

                .item-text {
                    color: var.$gray-10;
                    margin-left: 8px;
                }
            }

            .selected-menu {
                background-color: var.$gray-4;
            }

        }


    }

    .page-content {
        flex-grow: 1;
        flex-shrink: 1;

        .content-header {
            height: 48px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 8px var.$gray-3;
            /* 阴影 */
            border-radius: 4px;


            .header-left {
                margin-left: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-start;

            }


        }
    }


}
</style>