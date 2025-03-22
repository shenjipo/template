import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import type { Account } from '@/model/Account'

export const useUserStore = defineStore('user', () => {

    let user = ref<Account>({
        username: '',
        password: '',
        uuid: '',
        createTime: '',
        updateTime: '',
        id: 0
    })

    function setUser(par: Account) {
        localStorage.setItem('user', JSON.stringify(par))
        user.value = par
    }
    const getUser = computed(() => {
        if (!user.value.uuid) {
            user.value = JSON.parse(localStorage.getItem('user') || '')
        }
        return user.value

    })

    return {
        user,
        setUser,
        getUser
    }
})