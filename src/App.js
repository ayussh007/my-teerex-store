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
  

  //The code snippet overall checks the availability of a product and adds it to the cart if it is available and not already present. It also provides appropriate error 
  //messages to the user if the product is out of stock or already in the cart.

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
   

  // The code snippet overall checks the availability of a product in the cart and increases its quantity by updating the cartItems state if the conditions are met. 
  //It also provides an appropriate error message to the user if the product is out of stock or the quantity in the cart exceeds the available quantity

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


  //The code snippet overall checks the quantity of a product in the cart and either removes the product from the cart if the quantity is 1 or decrements the quantity 
  //if it is greater than 1. It updates the cartItems state accordingly.

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


  //The code snippet overall removes a product from the cart by filtering out the item with the matching ID from the cartItems array and updates the 
  //cartItems state accordingly.
  const handleDelete = (product) => {
    // Remove the product from the cart by filtering out the item with the matching ID and update the state with the filtered array, 
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };


 //The code snippet overall handles the case where the cart is empty and returns 0 as the total quantity in that scenario.
  const totalQuantity = (cartItems) => {
    // Check if the cartItems array is empty If it is, it means there are no items in the cart, so the function returns 0 as the total quantity.
    if (!cartItems.length) return 0;
    
   
   // The code snippet overall maps through the cartItems array to extract the productinCart values for each item, and then uses reduce to calculate the sum of those 
   // values, resulting in the total quantity of items in the cart.
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
         //This Route component is set to render when the current URL exactly matches the "/cart" path
        <Route exact path="/cart">
         //it receives props such as cartItems, handleAdd, removeFromCart, handleDelete, and totalQuantity.
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

