import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import type { Account } from '@/model/Account'

export const useUserStore = defineStore('user', () => {

    let user = ref<Account>({
        account: '',
        password: '',
        uuid: '',
        createTime: '',
        updateTime: '',
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