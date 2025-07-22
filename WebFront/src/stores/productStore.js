import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      { id: 1, name: 'Ligne', status: 'Active', inventory: 20, category: 'Books', channels: 2 },
    ],
    newProduct: {
      id: null,
      title: '',
      description: '',
      status: 'Active',
      onlineStore: true,
      pointOfSale: false,
      type: null,
      vendor: null,
      media: [],
      price: '',
      compareAtPrice: '',
      costPerItem: '',
      profit: '',
      margin: '',
      taxable: false,
      trackQuantity: false,
      quantity: 0,
      continueSelling: false,
      sku: '',
      isPhysical: false,
      weight: '0.0',
      customsInfo: false,
      variants: [],
      seoTitle: '',
    },
  }),
  actions: {
    addProduct(product) {
      this.newProduct.id = Date.now();
      this.products.push({ ...this.newProduct, ...product });
      this.resetNewProduct();
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) this.products.splice(index, 1, updatedProduct);
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id);
    },
    resetNewProduct() {
      this.newProduct = {
        id: null,
        title: '',
        description: '',
        status: 'Active',
        onlineStore: true,
        pointOfSale: false,
        type: null,
        vendor: null,
        media: [],
        price: '',
        compareAtPrice: '',
        costPerItem: '',
        profit: '',
        margin: '',
        taxable: false,
        trackQuantity: false,
        quantity: 0,
        continueSelling: false,
        sku: '',
        isPhysical: false,
        weight: '0.0',
        customsInfo: false,
        variants: [],
        seoTitle: '',
      };
    },
    calculateProfitMargin() {
      const price = parseFloat(this.newProduct.price) || 0;
      const compareAtPrice = parseFloat(this.newProduct.compareAtPrice) || 0;
      const cost = parseFloat(this.newProduct.costPerItem) || 0;
      this.newProduct.profit = (price - cost).toFixed(3);
      this.newProduct.margin = price > 0 ? ((price - cost) / price * 100).toFixed(2) : '0.00';
    },
  },
});