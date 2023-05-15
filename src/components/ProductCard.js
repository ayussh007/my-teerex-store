import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import {Grid} from "@mui/material";

// props: handleAddToCart, filteredProducts.
const ProductCard = ({ handleAddToCart, filteredProducts}) => {
    
return (

<div className="main-header">
<div className="row">
  {filteredProducts.length ? (
    filteredProducts.map((product) => (
      <div className="card-in-row" key={product.id} style={{border: "2px solid black"}}>
        <Typography style={{fontWeight: 900, zIndex:1, padding: "10px"}} className="card-header">{product.name}</Typography>
        <CardMedia style={{width: "100%", zIndex: 2}} className="card-head" height="140" component="img" alt={product.name} image={product.imageURL}/> 
        <CardContent>
        <Typography style={{color: "darkslategrey", fontWeight: 900}} className="card-body">Rs. {product.price}</Typography>
        //This is an event handler attached to the onClick prop of the <Button> component. It specifies what should happen when the button is clicked. In this case, 
        //it uses an arrow function to define an anonymous function that invokes the handleAddToCart function with the product object as an argument.
        //The purpose of passing the product as an argument to the handleAddToCart function is to provide the necessary information about the selected product to 
        //perform further actions, such as adding it to the shopping cart or updating the state.
        <Button style={{backgroundColor: "rgb(98, 98, 98)", color: "#fff", display: "block", border: "1px solid black"}} 
        className="card-btn" type="button" role="button" aria-label='add to cart'
        fullWidth variant="contained" onClick= {() => handleAddToCart(product)} >Add to cart</Button>
        </CardContent>
      </div>
    ))
  ) : (
    <h2 style={{ color: "darkgrey" }}>No Products Found</h2>
  )}
</div>
</div>
    );

  };
  
  export default ProductCard;
