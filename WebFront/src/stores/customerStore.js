import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', orders: 5, country: 'Tunisia', totalSpent: 150.00 }
    ],
    newCustomer: {
      id: null,
      name: '',
      email: '',
      status: 'Active',
      phone: '',
      country: '',
      address: '',
      orders: 0,
      totalSpent: 0,
      tags: [],
      recentOrders: []
    }
  }),
  actions: {
    async fetchCustomers() {
      // Simulate API call
      // In a real application, replace with actual API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.customers)
        }, 1000)
      })
    },
    addCustomer(customer) {
      this.newCustomer.id = Date.now()
      this.customers.push({ ...this.newCustomer, ...customer })
      this.resetNewCustomer()
    },
    updateCustomer(updatedCustomer) {
      const index = this.customers.findIndex(c => c.id === updatedCustomer.id)
      if (index !== -1) this.customers.splice(index, 1, updatedCustomer)
    },
    deleteCustomer(id) {
      this.customers = this.customers.filter(c => c.id !== id)
    },
    bulkDeleteCustomers(ids) {
      this.customers = this.customers.filter(c => !ids.includes(c.id))
    },
    resetNewCustomer() {
      this.newCustomer = {
        id: null,
        name: '',
        email: '',
        status: 'Active',
        phone: '',
        country: '',
        address: '',
        orders: 0,
        totalSpent: 0,
        tags: [],
        recentOrders: []
      }
    },
    async exportCustomers() {
      // Simulate export
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    async exportSelectedCustomers(customers) {
      // Simulate export of selected customers
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    async exportAllCustomers() {
      // Simulate export of all customers
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }
  }
})