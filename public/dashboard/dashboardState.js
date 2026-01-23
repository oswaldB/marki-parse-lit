function dashboardState() {
  return {
    products: [],
    purchasedProducts: [],
    nonPurchasedProducts: [],
    searchQuery: '',
    username: 'Utilisateur',
    
    async init() {
      // Charger les produits depuis le fichier JSON
      const response = await fetch('/config/products.json');
      this.products = await response.json();
      
      // Séparer les produits achetés et non achetés
      this.purchasedProducts = this.products.filter(product => product.isPurchased);
      this.nonPurchasedProducts = this.products.filter(product => !product.isPurchased);
      
      // Récupérer le username depuis le storage
      this.loadUsername();
    },
    
    loadUsername() {
      // Essayer de récupérer le username depuis localStorage ou sessionStorage
      const storedUsername = localStorage.getItem('parseUsername') || sessionStorage.getItem('parseUsername');
      if (storedUsername) {
        this.username = storedUsername;
      }
    },
    
    // Fonction pour filtrer les produits en fonction de la recherche
    filteredProducts(products) {
      if (!this.searchQuery) return products;
      return products.filter(product => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    
    // Fonction pour acheter un produit
    purchaseProduct(productId) {
      const productIndex = this.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        this.products[productIndex].isPurchased = true;
        this.purchasedProducts = this.products.filter(product => product.isPurchased);
        this.nonPurchasedProducts = this.products.filter(product => !product.isPurchased);
      }
    }
  };
}