import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { computed } from "vue";

export const useStore = defineStore('store', () => {
    const userStore = useUserStore()

    return {
        userStore
    }
})