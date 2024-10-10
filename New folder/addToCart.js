import { Component } from 'react'
import './addToCart.css'
import increment from '../images/icon-increment-quantity.svg'
import decrement from '../images/icon-decrement-quantity.svg'

class Button extends Component {


  render() {
    
    return (
      <>
          {this.props.ItemsProp.map((Item, index) => ( 
            <div key={index + "key" + index}>
            {this.props.productName === Item.productName?
            <div className="in-cart-button" key={"div" + index}>
            <button onClick={(() => this.props.removeItem(index, Item.productName))} key={"Item "+Item.productName} id="item"><img className='decrement-img' src={decrement} key={decrement + index} alt="decrement-img"/></button> 
            <p className='in-cart-button-p'key={this.props.productCount + index}>{this.props.productCount}</p>
            <button onClick={() => this.props.handleAddToCart(Item.productName, Item.price)}key={Item.productName + Item.productName}><img className='increment-img' src={increment} key={increment + index} alt="increment-img"/></button>
            </div>
            : null} 
            </div>
          ))}
      </>
    );
  };
}

export default Button 