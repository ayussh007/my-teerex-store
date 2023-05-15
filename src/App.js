import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import Products from "./components/Products";
import Cart from './components/Cart';

export const config = {
   // Define the endpoint for the local server
  endpoint: "http://localhost:3000",
  // Define the endpoint for an external resource (JSON file)
  endpoint2: "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
};


function App() {

  const [cartItems, setCartItems] = useState([]);
  
  const handleAddToCart = (product) => {
    // Find if the product is already in the cart based on its ID
    const productAvailable = cartItems.find((item) => item.id === product.id);
  
    // Check if the product's quantity is not zero
    if(product.quantity!==0){

      // Check if the product is already in the cart
      if (productAvailable) {
        
         // Alert the user that the product is already in the cart
        alert("Product is already in the cart!");
      } else {

      // Add the product to the cart with a quantity of 1
      setCartItems([...cartItems, { ...product, productinCart: 1 }]);
      }
    }
    else{
      // Alert the user that the product is out of stock
      alert("Product is out of stock!");
  }
  };

  const handleAddition = (product) => {
     // Find if the product is already in the cart based on its ID
    const productAvailable = cartItems.find((item) => item.id === product.id);

    // Check if the product is available in the cart and if the quantity in the cart is less than the total quantity
    if (productAvailable && productAvailable.productinCart < product.quantity) {

      // Update the cartItems array by mapping through each item
      // checks if the current item in the iteration has the same ID as the product being added. If it matches, a new object is created with the existing properties of 
      // productAvailable and an incremented productinCart value. Otherwise, the original item is returned.
      setCartItems( cartItems.map((item) => item.id === product.id ? { ...productAvailable, productinCart: productAvailable.productinCart + 1 }: item )
      );
    } else {
      //// Alert the user that the product is out of stock or the quantity in the cart exceeds the available quantity
      alert("Product is out of stock!");
    }
  };

  const removeFromCart = (product) => {
    // Find if the product is already in the cart based on its ID
    const productAvailable = cartItems.find((item) => item.id === product.id);

     // Check if the quantity of the product in the cart is 1
    if (productAvailable.productinCart === 1) {
      
       // Remove the product from the cart by filtering out the item with the matching ID
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      // Update the cartItems array by mapping through each item
      //checks if the current item in the iteration has the same ID as the product being removed. If it matches, a new object is created with the existing properties of 
      //productAvailable and a decremented productinCart value. Otherwise, the original item is returned.
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productAvailable, productinCart: productAvailable.productinCart - 1 }
            : item
        )
      );
    }
  };

  const handleDelete = (product) => {
    // Remove the product from the cart by filtering out the item with the matching ID and update the state with the filtered array, 
    setCartItems(cartItems.filter((item) => item.id !== product.id));
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const totalQuantity = (cartItems) => {
    // Check if the cartItems array is empty If it is, it means there are no items in the cart, so the function returns 0 as the total quantity.
    if (!cartItems.length) return 0;
    
     // Map through the cartItems array and extract the productinCart value for each item
    const totalItem = cartItems
      .map((item) => item.productinCart)
       // Use reduce to sum up the productinCart values
      .reduce((totalItem, n) => totalItem + n);
    
    // Return the totalItem value, which represents the total quantity
    return totalItem;
  };

  return (
    <div className="App">
      //used to render only the first Route that matches the current URL
      <Switch>
        <Route exact path="/">
        //It receives props such as cartItems, handleAddToCart, and totalQuantity.
        <Products
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            totalQuantity={totalQuantity}
          />
        </Route>
        <Route exact path="/cart">
        <Cart
            cartItems={cartItems}
            handleAdd={handleAddition}
            removeFromCart={removeFromCart}
            handleDelete={handleDelete}
            totalQuantity={totalQuantity}
          />
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;

