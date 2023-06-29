import React from "react";
import data from "../data.json";
import Cart from "./Cart";
import "../Stylesheets/style.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sortProducts: "",
      products: [],
      sizes: [],
      filteredProducts: [],
      cart: [],
      toggle: false,
    };
  }

  handleSort = (size) => {
    this.setState({
      sizes: [...this.state.sizes, size],
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      sortProducts: event.target.value,
    });
  };
  handleAddToCart = (product) => {
    if (this.state.cart.indexOf(product) === -1 ? true : false) {
      this.setState((prevState) => {
        return {
          cart: [...prevState.cart, product],
        };
      });
    }
  };
  mainHandleCallback = (productId) => {
    this.setState({
      cart: this.state.cart.filter((product) => product.id !== productId),
    });
  };
  handleCart = () => {
    this.setState({
      toggle: this.state.toggle,
    });
  };

  render() {
    let filteredArray = [];
    if (this.state.sizes.length >= 1) {
      for (let i = 0; i < this.state.sizes.length; i++) {
        data.products.filter((product) => {
          if (product.availableSizes.includes(this.state.sizes[i])) {
            filteredArray.indexOf(product) === -1
              ? filteredArray.push(product)
              : console.log("");
          }
          return "";
        });
      }
    }
    let productsArray;
    if (filteredArray.length === 0) {
      productsArray = data.products;
    } else {
      productsArray = filteredArray;
    }
    if (this.state.sortProducts === "Highest to Lowest") {
      productsArray = productsArray.sort((a, b) => b.price - a.price);
    }
    if (this.state.sortProducts === "Lowest to Highest") {
      productsArray = productsArray.sort((a, b) => a.price - b.price);
    }
    return (
      <>
          <h2 className= "heading">Welcome to Men's Collections</h2>
        <div className="container flex">
          <aside className="aside">
            <span>Sizes:</span>
            <div>
              <button onClick={() => this.handleSort("X")}>X</button>
              <button onClick={() => this.handleSort("L")}>L</button>
              <button onClick={() => this.handleSort("XL")}>XL</button>
              <button onClick={() => this.handleSort("XXL")}>XXL</button>
              <button onClick={() => this.handleSort("M")}>M</button>
              <button onClick={() => this.handleSort("XS")}>XS</button>
              <button onClick={() => this.handleSort("S")}>S</button>
            </div>
          </aside>
          <main className="main all-product">
            <header className="header flex space-between">
              <h1>{productsArray.length} Product(s) found</h1>
              <form>
                <select onChange={this.handleSubmit} name="sort" id="sort">
                  <option>Sort the products</option>
                  <option value="Highest to Lowest">Price - High to Low</option>
                  <option value="Lowest to Highest">Price - Low to High</option>
                </select>
              </form>
            </header>
            <section className="flex wrap">
              {productsArray.map((eachProduct) => (
                <article key={eachProduct.id} className="product">
                  <img
                    src={`/static/products/${eachProduct.sku}_1.jpg`}
                    alt={eachProduct.title}
                  />
                  <p className="title">{eachProduct.title}</p>
                  <p>{eachProduct.availableSizes}</p>
                  <div className="flex item-center justify-center price">
                    <p>{eachProduct.currencyFormat}</p>
                    <p>{eachProduct.price}</p>
                  </div>
                  <button onClick={() => this.handleAddToCart(eachProduct)}>
                    Add to the cart
                  </button>
                </article>
              ))}
            </section>
            <div className="cart flex">
              <div onClick={this.handleCart} className="cart-imgs">
                <img src="/static/bag-icon.png" alt="bag-icon.png" />
              </div>
              <section className={this.state.toggle ? "display" : "none"}>
                <div className="cart-close flex space-between">
                  <h3>Cart</h3>
                </div>
                <Cart
                  cart={this.state.cart}
                  mainParentCallback={this.mainHandleCallback}
                />
              </section>
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default App;