import './confirm.css'
import React from 'react';
import Confirmed from'../images/icon-order-confirmed.svg'
import remove from '../images/icon-remove-item.svg'

const Confirm = ({ onClose, totalPrice, ItemsProp, resetButton, products }) => {
  console.log(ItemsProp)

  const handleSubmitForm = (event) => {
    event.preventDefault();
  }

  const handleSubmitBtn = () => {
    onClose();
    resetButton();
    console.log(products)
  }

  return (
    <form className="confirm-overlay" onSubmit={handleSubmitForm}>
      <div className="confirm-popover">
        <img src={Confirmed} alt="confirmed" id="confirm-img"/>
        <h1>Order Confirmed</h1>
        <p className='enjoy'>We hope you enjoy your food!</p>
        <main className='confirm-main'>
          <div>
            {ItemsProp.map(item => (
              <div className='item-div'>
                <div className='item-container'>
                  <img src={item.photo} alt={item + " photo"} className='confirm-images'/>
                  <div className='display'>
                    <p className='p4'>{item.productName}</p>
                    <div className='display-f'>
                      <p className='p1'>{item.count}x</p>
                      <p className='p2'><span>@</span>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className='li-total'>${item.changedPrice.toFixed(2)}</p>
              </div>
              </div>
            ))}
          </div>
          <div className='total-div'>
            <p className='total-confirm-price'>Order Total</p>
            <span style={{fontWeight: "bold", fontSize: "21px"}}>${totalPrice.toFixed(2)}</span>
          </div>
        {/* Add more order details here */}
        </main>
          <button onClick={onClose} className='close-btn'><img src={remove} alt="remove-icon"/></button>
          <button className="submit-btn" type='submit' onClick={handleSubmitBtn}>Start New Order</button>
      </div>
    </form>
  );
};

export default Confirm;