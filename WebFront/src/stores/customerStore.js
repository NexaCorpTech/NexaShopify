import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'Active',
        totalOrders: 5,
        group: 'Regular',
        lastOrderDate: '2025-05-15T10:00:00Z'
      }
    ],
    newCustomer: {
      id: null,
      name: '',
      email: '',
      phone: '',
      status: 'Active',
      group: 'Regular',
      totalOrders: 0,
      lastOrderDate: null,
      address: {
        street: '',
        city: '',
        postalCode: '',
        country: ''
      },
      company: '',
      notes: '',
      tags: [],
      newsletterSubscribed: false
    }
  }),
  actions: {
    async fetchCustomers() {
      // Simulated API call
      try {
        // In a real app, this would fetch from an API
        // For now, using the initial state
        return this.customers;
      } catch (error) {
        throw new Error('Failed to fetch customers');
      }
    },
    addCustomer(customer) {
      this.newCustomer.id = Date.now();
      this.customers.push({ ...this.newCustomer, ...customer });
      this.resetNewCustomer();
    },
    updateCustomer(updatedCustomer) {
      const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
      if (index !== -1) this.customers.splice(index, 1, updatedCustomer);
    },
    deleteCustomer(id) {
      this.customers = this.customers.filter(c => c.id !== id);
    },
    bulkDeleteCustomers(ids) {
      this.customers = this.customers.filter(c => !ids.includes(c.id));
    },
    async exportCustomers() {
      try {
        // Simulated export logic
        console.log('Exporting all customers:', this.customers);
        // In a real app, this would generate a file (e.g., CSV)
        return true;
      } catch (error) {
        throw new Error('Failed to export customers');
      }
    },
    async exportSelectedCustomers(customers) {
      try {
        // Simulated export logic for selected customers
        console.log('Exporting selected customers:', customers);
        // In a real app, this would generate a file (e.g., CSV)
        return true;
      } catch (error) {
        throw new Error('Failed to export selected customers');
      }
    },
    async exportAllCustomers() {
      try {
        // Simulated export all logic
        console.log('Exporting all customers:', this.customers);
        // In a real app, this would generate a file (e.g., CSV)
        return true;
      } catch (error) {
        throw new Error('Failed to export all customers');
      }
    },
    resetNewCustomer() {
      this.newCustomer = {
        id: null,
        name: '',
        email: '',
        phone: '',
        status: 'Active',
        group: 'Regular',
        totalOrders: 0,
        lastOrderDate: null,
        address: {
          street: '',
          city: '',
          postalCode: '',
          country: ''
        },
        company: '',
        notes: '',
        tags: [],
        newsletterSubscribed: false
      };
    }
  }
});