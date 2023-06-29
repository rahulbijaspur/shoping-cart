import React from "react";
import EachProduct from "./EachProduct";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteProduct: "",
    };
  }
  handleCallback = (childData) => {
    this.setState({
      deleteProduct: childData,
    });
  };
  handleCheckout = () => {
    let data = this.props.cart;
    var final = data.reduce((acc, cv) => {
      acc += cv.price;
      return acc;
    }, 0);

    alert(`Checkout - Subtotal: $ ${final}`);
  };

  render() {
    let arrayData = this.props.cart;
    console.log(arrayData);
    return (
      <>
        <div className="scroll">
          {arrayData.map((eachProduct) => (
            <EachProduct
              eachProduct={eachProduct}
              cartTwo={this.props.cart}
              parentCallback={this.props.mainParentCallback}
            />
          ))}
        </div>
        <div className="checkout">
          <div className="flex space-between">
            <span>SUBTOTAL </span>
            <p>
              $
              {arrayData.reduce((acc, cv) => {
                acc += cv.price;
                return acc;
              }, 0)}
            </p>
          </div>
          <button onClick={this.handleCheckout}>Checkout </button>
        </div>
      </>
    );
  }
}

export default Cart;