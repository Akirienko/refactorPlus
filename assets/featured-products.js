

class FeaturedProducts extends HTMLElement {
  constructor() {
    super();
    this.cart = null;
    this.productsContainer = this.querySelector('[data-products-container]');
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    await this.fetchCart();

    this.filterProductsInCart();

    this.setupEventListeners();
  }


  async fetchCart() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      this.cart = { items: [] };
    }
  }

  filterProductsInCart() {
    if (!this.cart || !this.cart.items || this.cart.items.length === 0) {
      return;
    }

    const cartProductIds = this.cart.items.map(item => item.product_id);
    const productItems = this.querySelectorAll('[data-product-item]');

    productItems.forEach(item => {
      const productId = parseInt(item.dataset.productId);
      if (cartProductIds.includes(productId)) {
        item.dataset.inCart = 'true';
      }
    });
  }

  setupEventListeners() {
    const buttons = this.querySelectorAll('[data-variant-id]');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAddToCart(button);
      });
    });
  }

  async handleAddToCart(button) {
    const variantId = button.dataset.variantId;
    const productId = button.dataset.productId;

    if (!variantId) return;

    button.dataset.loading = 'true';
    button.disabled = true;

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            id: variantId,
            quantity: 1
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const result = await response.json();

      const productItem = button.closest('[data-product-item]');
      if (productItem) {
        productItem.dataset.inCart = 'true';
      }

      await this.fetchCart();

      this.triggerCartUpdate();

    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');

      button.dataset.loading = 'false';
      button.disabled = false;
    }
  }


  triggerCartUpdate() {
    document.documentElement.dispatchEvent(
      new CustomEvent('cart:refresh', {
        bubbles: true
      })
    );

    if (window.Shopify && window.Shopify.theme) {
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          document.documentElement.dispatchEvent(
            new CustomEvent('cart:updated', {
              bubbles: true,
              detail: { cart }
            })
          );
        });
    }

    const cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer) {
      cartDrawer.open();
    }

    const cartNotification = document.querySelector('cart-notification');
    if (cartNotification) {
      cartNotification.open();
    }
  }


  async refreshSection() {
    const sectionId = this.dataset.sectionId;
    if (!sectionId) return;

    try {
      await this.fetchCart();

      const response = await fetch(
        `${window.location.pathname}?section_id=${sectionId}`
      );

      if (!response.ok) return;

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newSection = doc.querySelector('featured-products');

      if (newSection && this.productsContainer) {
        const newContainer = newSection.querySelector('[data-products-container]');
        if (newContainer) {
          this.productsContainer.innerHTML = newContainer.innerHTML;

          this.filterProductsInCart();

          this.setupEventListeners();
        }
      }
    } catch (error) {
      console.error('Error refreshing section:', error);
    }
  }
}

if (!customElements.get('featured-products')) {
  customElements.define('featured-products', FeaturedProducts);
}
