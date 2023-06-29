import React from "react";

class EachProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }
  addQuantity = (each, index) => {
    
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
      quantity: this.state.quantity + 1,
    });
  };
  removeQuantity = (each, index) => {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
      quantity:
        this.state.quantity === 0
          ? this.state.quantity
          : this.state.quantity - 1,
    });
  };
  onTrigger = (id) => {
    console.log(id, this.props);
    this.props.parentCallback(id);
  };

  render() {
    return (
      <>
        <article key={this.props.eachProduct.id} className="cart-item">
          <img
            src={`/static/products/${this.props.eachProduct.sku}_2.jpg`}
            alt={this.props.eachProduct.title}
          />
          <div>
            <p>{this.props.eachProduct.title}</p>
            <p>Quantity : {this.state.quantity}</p>
          </div>
          <div className="prices">
            <p>$ {this.props.eachProduct.price}</p>
            <button onClick={this.addQuantity}>+</button>
            <button onClick={this.removeQuantity}>-</button>
          </div>
          <div className="btn-delete">
            <button onClick={() => this.onTrigger(this.props.eachProduct.id)}>
              ❌
            </button>
          </div>
        </article>
      </>
    );
  }
}
export default EachProduct;