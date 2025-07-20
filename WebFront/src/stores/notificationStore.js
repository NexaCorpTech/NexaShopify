// @/stores/notificationStore.js
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    toast: useToast(),
    notifications: [],
    unreadCount: 0
  }),

  actions: {
    /**
     * Affiche une notification toast
     * @param {Object} options - Options de la notification
     * @param {string} options.severity - Niveau de sévérité ('success', 'info', 'warn', 'error')
     * @param {string} options.summary - Titre de la notification
     * @param {string} options.detail - Message détaillé
     * @param {number} [options.life=3000] - Durée d'affichage en ms
     * @param {boolean} [options.sticky=false] - Si true, la notification reste visible
     */
    showToast({ severity, summary, detail, life = 3000, sticky = false }) {
      this.toast.add({
        severity,
        summary,
        detail,
        life,
        sticky
      })

      // Enregistrer aussi dans l'historique
      this.addToHistory({
        type: 'toast',
        severity,
        title: summary,
        message: detail,
        timestamp: new Date()
      })
    },

    /**
     * Ajoute une notification à l'historique
     * @param {Object} notification - Notification à ajouter
     */
    addToHistory(notification) {
      this.notifications.unshift({
        id: Date.now(),
        read: false,
        ...notification
      })
      this.unreadCount++
    },

    /**
     * Marque une notification comme lue
     * @param {number} id - ID de la notification
     */
    markAsRead(id) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification && !notification.read) {
        notification.read = true
        this.unreadCount--
      }
    },

    /**
     * Marque toutes les notifications comme lues
     */
    markAllAsRead() {
      this.notifications.forEach(n => {
        if (!n.read) {
          n.read = true
        }
      })
      this.unreadCount = 0
    },

    /**
     * Supprime une notification
     * @param {number} id - ID de la notification
     */
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        if (!this.notifications[index].read) {
          this.unreadCount--
        }
        this.notifications.splice(index, 1)
      }
    },

    /**
     * Vide l'historique des notifications
     */
    clearHistory() {
      this.notifications = []
      this.unreadCount = 0
    },

    // Méthodes helpers pour les types courants
    success(message, title = 'Success') {
      this.showToast({
        severity: 'success',
        summary: title,
        detail: message
      })
    },

    info(message, title = 'Information') {
      this.showToast({
        severity: 'info',
        summary: title,
        detail: message
      })
    },

    warning(message, title = 'Warning') {
      this.showToast({
        severity: 'warn',
        summary: title,
        detail: message
      })
    },

    error(message, title = 'Error') {
      this.showToast({
        severity: 'error',
        summary: title,
        detail: message,
        life: 5000
      })
    }
  },

  getters: {
    /**
     * Retourne les notifications non lues
     */
    unreadNotifications: (state) => {
      return state.notifications.filter(n => !n.read)
    },

    /**
     * Retourne les notifications récentes (7 derniers jours)
     */
    recentNotifications: (state) => {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return state.notifications.filter(n => new Date(n.timestamp) > oneWeekAgo)
    }
  }
})