
import { defineStore } from 'pinia'
import api from '@/axios'  // <-- Utilise l'instance avec interceptor
import Cookies from 'js-cookie'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: Cookies.get('token') || null,
        isLoggedIn: !!Cookies.get('token'),
        loading: false,
        errors: null,
    }),
    actions: {
        async login({ username, password, rememberMe }) {
            this.loading = true
            this.errors = null
            try {
                const { data } = await api.post('/authentication/login', {
                    username,
                    password,
                    rememberMe,
                })
                const res = data.response
                if (res.Success && res.ResponseBody) {
                    this.token = res.ResponseBody
                    this.isLoggedIn = true
                    // La durée dépend du rememberMe (ex: 30 jours ou session)
                    if (rememberMe) {
                        Cookies.set('token', res.ResponseBody, { expires: 30, secure: true, sameSite: 'strict' })
                    } else {
                        Cookies.set('token', res.ResponseBody)
                    }
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
            Cookies.remove('token')
        },
        initialize() {
            const stored = Cookies.get('token')
            if (stored) {
                this.token = stored
                this.isLoggedIn = true
            }
        }
    }
})
