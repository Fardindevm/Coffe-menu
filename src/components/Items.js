import { Component } from "react";
import './Items.css'
import remove from'../images/icon-remove-item.svg'
import carbon from '../images/icon-carbon-neutral.svg'

class Items extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      total: this.props.ItemsProp[0].price.toFixed(2),
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    
    return (
      <form className="Items-div" onSubmit={this.handleSubmit}>
        <ul>
          {this.props.ItemsProp.map((Item, index) => (
            <div key={index + "div"} className="Main-item-div" id={index}>
              <li key={index} className="Item-li">
                {Item.productName}
              </li>
              <button className="button" onClick={(() =>this.props.removeItem(index, Item.productName))}>
                <img className="remove-icon" src={remove} alt="remove-icon"/>
              </button>
              <div className="Item-div" key={index + "key"}>
                <p key={index + "p1"} className="p1">{this.props.ItemsProp[index].count}x</p>
                <p key={index + "p2"} className="p2"><span>@</span>${this.props.MainPrice[index].toFixed(2)}</p>
                <p key={index + "p3"} className="p3"><span>$</span>{this.props.ItemsProp[index].changedPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </ul>
        <div>
          <div className="total">
            <p>Order Total</p>
            <h2>${this.props.totalPrice.toFixed(2)}</h2>
          </div>
          <div className="carbon-neutral">
            <img src={carbon} alt="carbon"/> <p>This is a <span className="carbon-neutral-span">carbon-neutral</span> delivery</p>
          </div>
          <button className="Confirm-button" type="button" onClick={this.props.toggleConfirm}>Confirm Order</button>
        </div>
      </form>
    )
  }
}

export default Items;