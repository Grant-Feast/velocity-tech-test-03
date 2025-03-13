class QuantityAdjuster extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('[data-quantity-input]');
    this.minusButton = this.querySelector('[data-quantity-minus]');
    this.plusButton = this.querySelector('[data-quantity-plus]');
    
    this.priceElement = this.closest('.product-form').querySelector('#actPrice');
    this.basePrice = parseFloat(this.priceElement?.dataset.price || 0);

    this.minusButton.addEventListener("click", () => this.updateQuantity(-1));
    this.plusButton.addEventListener("click", () => this.updateQuantity(1));
  }

  updateQuantity(change) {
    const currentValue = parseInt(this.input.value) || 1;
    const newValue = Math.max(1, currentValue + change);
    this.input.value = newValue;

    // Update the price
    this.updatePrice(newValue);

    this.input.dispatchEvent(new Event("change"));
  }

  updatePrice(quantity) {
    if (this.priceElement) {
      const newPrice = (this.basePrice * quantity).toFixed(2);
      this.priceElement.textContent = newPrice;
    }
  }
}

customElements.define("quantity-adjuster", QuantityAdjuster);