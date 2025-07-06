import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        isLoggedIn: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
        loading: false,
        errors: null,
    }),
    actions: {
        async login({ username, password, rememberMe }) {
            this.loading = true
            this.errors = null
            try {
                const { data } = await axios.post('/api/authentication/login', {
                    username,
                    password,
                    rememberMe,
                })
                const res = data.response
                if (res.Success && res.ResponseBody) {
                    this.token = res.ResponseBody
                    this.isLoggedIn = true
                    if (rememberMe) {
                        localStorage.setItem('token', res.ResponseBody)
                        sessionStorage.removeItem('token')
                    } else {
                        sessionStorage.setItem('token', res.ResponseBody)
                        localStorage.removeItem('token')
                    }
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.ResponseBody}`
                    return true
                } else if (res.Errors) {
                    this.errors = res.Errors
                } else {
                    this.errors = ["Erreur inconnue."]
                }
                this.isLoggedIn = false
                this.token = null
                return false
            } catch (e) {
                this.errors = ['Erreur serveur ou réseau']
                this.isLoggedIn = false
                this.token = null
                return false
            } finally {
                this.loading = false
            }
        },
        logout() {
            this.token = null
            this.isLoggedIn = false
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        },
        initialize() {
            const stored = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (stored) {
                this.token = stored
                this.isLoggedIn = true
                axios.defaults.headers.common['Authorization'] = `Bearer ${stored}`
            }
        }
    }
})
