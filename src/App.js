import './App.css';
import baklava from './images/image-baklava-desktop.jpg'
import macaron from './images/image-macaron-desktop.jpg'
import brownie from './images/image-brownie-desktop.jpg'
import cake from './images/image-cake-desktop.jpg'
import creme_brulee from './images/image-creme-brulee-desktop.jpg'
import meringue from './images/image-meringue-desktop.jpg'
import panna_cotta from './images/image-panna-cotta-desktop.jpg'
import tiramisu from './images/image-tiramisu-desktop.jpg'
import waffle from './images/image-waffle-desktop.jpg'
import buy from './images/icon-add-to-cart.svg';
import illustration from './images/illustration-empty-cart.svg';
import { Component } from 'react';
import Items from './components/Items'
import Button from './components/addToCart'
import Confirm from "./components/confirm";

class App extends Component {

  constructor(props) {
    super(props)
     this.state = {

      products: [
        {
          image: waffle,
          shortName: "Waffle",
          fullName: "Waffle with Berries",
          showButton: true,
          price: 6.50
        },
        {
          image: creme_brulee,
          shortName: "Creme Brulee",
          fullName: "Vanilla Bean Creme Brulee",
          showButton: true,
          price: 7.00
        },
        {
          image: macaron,
          shortName: "Macaron",
          fullName: "Macaron Mix of Five",
          showButton: true,
          price: 8.00
        },
        {
          image: tiramisu,
          shortName: "Tiramisu",
          fullName: "Classic Tiramisu",
          showButton: true,
          price: 5.50
        },
        {
          image: baklava,
          shortName: "Baklava",
          fullName: "Pistacho Baklava",
          showButton: true,
          price: 4.00
        },
        {
          image: meringue,
          shortName: "Pie",
          fullName: "Lemon Meringue Pie",
          showButton: true,
          price: 5.00
        },
        {
          image: cake,
          shortName: "Cake",
          fullName: "Red Velvet Cake",
          showButton: true,
          price: 4.50
        },
        {
          image: brownie,
          shortName: "Brownie",
          fullName: "Salted Caramel Brownie",
          showButton: true,
          price: 5.50
        },
        {
          image: panna_cotta,
          shortName: "Panna Cotta<",
          fullName: "Vanilla Panna Cotta",
          showButton: true,
          price: 6.50
        }
      ],

      totalItem: 0,
      addedItem: [],
      productPrice: [],
      totalPrice: 0,
      showConfirm: false,
      showItems: false  // New state variable
    }

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.updateItems = this.updateItems.bind(this)
    this.updateShowItems = this.updateShowItems.bind(this)
    this.updateShowButton = this.updateShowButton.bind(this)
    this.updateCounts = this.updateCounts.bind(this)
    this.updateTotal = this.updateTotal.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.toggleConfirm = this.toggleConfirm.bind(this)
    this.resetButton = this.resetButton.bind(this)
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showConfirm !== prevState.showConfirm) {
      document.body.style.overflow = this.state.showConfirm ? 'hidden' : 'unset';
    }
  }

  handleAddToCart = (productName, price, photo) => {
    this.setState(prevState => {      
      const existingItem = prevState.addedItem.find(item => item.productName === productName);
      let newAddedItem;
      let total = prevState.totalPrice + price;
      let product;
      console.log(existingItem)
      console.log(price)
      if (existingItem) {
        newAddedItem = prevState.addedItem.map(item => 
          item.productName === productName 
            ? { ...item, count: item.count + 1, changedPrice: price * (item.count + 1)}
            : item
        );
      } else {
        newAddedItem = [...prevState.addedItem, {productName, price, changedPrice: price, count: 1, showButton: true, photo: photo}];
        product= price;
      } 

      return {
        addedItem: newAddedItem,
        productPrice: [...prevState.productPrice, product],
        products: prevState.products.map(element => element.fullName === productName? {...element, showButton: false}: element),
        totalPrice: total,
        totalItem: prevState.totalItem + 1,
        showItems: true
      };
    });
  };
  

  removeItem = (index, name) => {
    
    const updatedItems = this.state.addedItem.filter((_, i) => i !== index);
    // const findItem = this.state.addedItem.find((_, i) => i === index);
    const findProduct = this.state.products.find((i) => i.fullName === name);
    const findItem = this.state.addedItem.find((item) => item.productName === findProduct.fullName)
    console.log(name)
    console.log(this.state.addedItem)
    console.log(findProduct)
    if (findItem.count <= 1) {
      this.updateShowButton(findProduct, true);

      if (this.state.addedItem.length > 1) {
        this.updateItems(updatedItems);
        this.updateShowItems(true)
      } else {
        this.updateItems(updatedItems);
        this.updateShowItems(false);
      }
      
      
    } else{
      const updatedItem = {
        ...findItem,
        count: findItem.count - 1,
        changedPrice: findItem.changedPrice - (findItem.changedPrice / findItem.count)
      };
      this.updateCounts(updatedItem)
    } 
    this.updateTotal(findItem)
  }

  updateItems = (newItems) => {
    this.setState((prevState) => ({ addedItem: newItems, totalItem: prevState.totalItem - 1}));
  }
  
  updateCounts = (updatedItem) => {
    this.setState(prevState => ({
      addedItem: prevState.addedItem.map(item => 
        item.productName === updatedItem.productName ? updatedItem : item
      ),
      totalItem: prevState.totalItem - 1,
    }));
  }
  
  updateTotal = (findItem) => {
    this.setState(prevState => ({
      totalPrice: prevState.totalPrice - findItem.changedPrice / findItem.count
    }))
  }

  updateShowItems = (show) => {
    this.setState({ showItems: show});
  }

  updateShowButton = (itemFullName, show) => {
    
    this.setState(prevState => ({
      products: prevState.products.map(product =>
        product.fullName === itemFullName.fullName ? { ...product, showButton: show } : product
      )
    }))
  }

  toggleConfirm = () => {
    this.setState(prevState => ({ showConfirm: !prevState.showConfirm }));
  }
  
  resetButton = () => {
    this.setState((prevState) => ({
      products: prevState.products.map(product =>
        product.showButton === false? { ...product, showButton: true } : product
      ),
      totalItem: 0,
      addedItem: [],
      productPrice: [],
      totalPrice: 0,
      showConfirm: false,
      showItems: false 
    }))
  }
  
render() {
  const products = this.state.products;
  const filter = this.state.productPrice.filter(product => product !== undefined)
  return (
    <div className="App">
      <main className="Main">
        <div className="Main-left">
          <h1 className="Main-fh2">Desserts</h1>
          <div className='products'>
            {products.map((product, index) => (
              
              <div className='product-container' key={index}>
                <div className='Main-picture-info'>
                  <img src={product.image} className="dessert-photo" alt={`${product.shortName}-desktop`} />
                  {product.showButton ? 
                  <button 
                    className='add-to-cart' 
                    value={product.shortName}
                    onClick={() => this.handleAddToCart(product.fullName, product.price, product.image)}
                    key={index}
                  >
                    <img src={buy} className='cart-icon' alt="cart icon"/>
                    Add to Cart
                  </button>
                  : 
                  <Button 
                  showButton={product.showButton}
                  productName={product.fullName}
                  productCount={this.state.addedItem.find(item => item.productName === product.fullName)?.count || 0}
                  ItemsProp={this.state.addedItem} 
                  removeItem={this.removeItem}
                  handleAddToCart={this.handleAddToCart}
                  />
                  }

                </div>
                <div className='product-info'>
                  <p className="dessert-short-name">{product.shortName}</p>
                  <h5 className="dessert-full-name">{product.fullName}</h5>
                  <p className="price">{product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className='Main-right'>
          <h2>Your Cart({this.state.totalItem})</h2>
          {this.state.showItems ? (
              <Items ItemsProp={this.state.addedItem} 
              products={this.state.products}
              Total={this.state.totalItem} 
              totalPrice={this.state.totalPrice}
              MainPrice={filter} 
              updateShowItems={this.updateShowItems}
              updateShowButton={this.updateShowButton}
              updateItems={this.updateItems}
              updateTotal={this.updateTotal}
              removeItem={this.removeItem}
              toggleConfirm={this.toggleConfirm}
              />
            ) : (
              <div className='items'>
                <img src={illustration} className='illustration' alt="Empty cart illustration"/>
                <p className='items-p'>Your added items will appear here</p>
              </div>
            )}
        </aside>
      </main>
      {this.state.showConfirm && 
            <Confirm 
              onClose={this.toggleConfirm}
              totalPrice={this.state.totalPrice}
              ItemsProp={this.state.addedItem}
              resetButton={this.resetButton}
              products={this.state.products}

              />
          }
    </div>
  );
}}
export default App;
