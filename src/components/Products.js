import {Grid} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Link from '@mui/material/Link';
import Header from "./Header";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import "./Products.css";
import Filter from "./Filter";

//accepts three props: cartItems, handleAddToCart, and totalQuantity.
const Products = ({cartItems, handleAddToCart, totalQuantity}) => {

    const [productData,setProductData]=useState([]);
    const [noProductsFound, setNoProductsFound] = useState(false);
    //a state variable filters initialized with an object containing different filter properties (color, gender, price, type), all initially set to empty strings. 
    const [filters, setFilters] = useState({
      color: '',
      gender: '',
      price: '',
      type: ''
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

  const performAPICall = async () => {
     // API endpoint URL
    const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

    try {
      // Make a GET request to the API endpoint using axios
      const res = await axios.get(url);
      // Check if the response status is 200 (OK)
      if (res.status === 200) {
        console.log(res.data, "PERFORM API");
        // Update the productData state variable with the response data
        setProductData(res.data);
        // Update the filteredProducts state variable with the response data
        setFilteredProducts(res.data)
        // Return the response data
        return res.data;
      }
    } catch (error) {
      // Handle errors by displaying a snackbar notification
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details", { variant: "warning" }
      );
    }
  };

  const onSearch = (searchTerm) => {
    // Check if the search term is empty
    if (searchTerm === "") {
      // Reset the filteredProducts to the original productData
      setFilteredProducts(productData)
      // Set noProductsFound to false since all products are displayed
      setNoProductsFound(false);
    } else {
      // Filter products based on the search term
      const searchedProducts = productData.filter((product) => {
        const { name, color, type } = product;
        const searchString = `${name} ${color} ${type}`;
        // Check if the search term is present in the product's name, color, or type
        return searchString.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (searchedProducts.length > 0) {
      // Update the filteredProducts with the searched products
      setFilteredProducts(searchedProducts)
      setNoProductsFound(false);
    } else {
      // No products found matching the search term
      // Clear the filteredProducts array
      setFilteredProducts([]);
      setNoProductsFound(true);
    }
    }
  };

  // it will only run once due to the empty dependency array.
  useEffect(()=>{
    // Define an asynchronous function for data fetching
    const datafetching = async () => {
     // Call the performAPICall function to fetch product data
    const productdata = await performAPICall();
    };
    // Call the dataFetching function when the component mounts
    datafetching();
    },[]);


    //The code snippet demonstrates an event handler function that handles changes to filter values. It creates a new copy of the filters object with the updated value 
    //for the specified filter, sets the state with the updated filters, and logs the changes for debugging purpose
    const handleFilterChange = (name, value) => {
      //updates the specified filter ([name]) with the new value. This ensures immutability by creating a new object instead of modifying the original filters object.
      const updatedFilters = { ...filters, [name]: value };
      console.log("Filters are: ", updatedFilters);
      // Update the filters state with the updated filters
      //It triggers a re-render of the component and reflects the new filters in the UI.
      setFilters(updatedFilters);
      console.log("filter updated after: ", updatedFilters)
    }


    //The useEffect is triggered when the filters or productData state changes. It performs the filtering of products based on the selected filters and updates the 
    //filteredProducts state accordingly. By including filters and productData as dependencies, the effect ensures that it will be triggered whenever either of 
    //these values change. This ensures that the filtering logic is applied whenever the filters or the product data is updated.
    useEffect(() => {
      console.log('Filtering products with filters:', filters);
      // Create a new array of filtered products initialized with all products
      let newFilteredProducts = [...productData];
      console.log("New Filtered Products are: ", newFilteredProducts)
      
      // Apply color filter if a color is selected
      console.log("Color filter value: ", filters.color);
      if (filters.color) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) =>
            product.color.toLowerCase() === filters.color.toLowerCase()
        );
        console.log("New Filtered Products after applying color filter: ", newFilteredProducts)
      }
      // Apply gender filter if a gender is selected
      if (filters.gender) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.gender === filters.gender
        );
      }
      // Apply price filter if a price range is selected
      if (filters.price) {
        let minPrice, maxPrice;
        switch (filters.price) {
          case '0-250':
            minPrice = 0;
            maxPrice = 250;
            break;
          case '251-450':
            minPrice = 251;
            maxPrice = 450;
            break;
          case '451-600':
            minPrice = 451;
            maxPrice = 600;
            break;
          default:
            minPrice = 0;
            maxPrice = 0;
            break;
        }
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }
      // Apply type filter if a type is selected
      if (filters.type) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.type === filters.type
        );
      }
      console.log('Filtered Porducts:', newFilteredProducts)
      // Set the state with the new filtered products
      setFilteredProducts(newFilteredProducts);
    }, [filters, productData]);

    return (
      <div>
        <Header children cartItems={cartItems} totalQuantity={totalQuantity} />
     
        <Grid container>
          <Grid 
          xs={12} md={9} 
          item className="product-grid" bgcolor="white">

          {noProductsFound && (
            <>
          <p>No products found for the given search term.</p>
          <Link href="/">Go back to product main page</Link>

          </>
          )}
          
          <SearchBar onSearch={onSearch} sx={{ m: 4 }}
            className="search-desktop" size="small" fullWidth id="standard-basic" variant="standard" />
      
          <Grid container>

          <Grid item xs={3}>
          //<Filter> component is being rendered with two props: filters and onFilterChange.
          //filters prop is passed with the value of filters. It is an object that holds filter options or values that control the filtering function in the <Filter> comp
          //onFilterChange: This prop is passed with a function (name, value) => handleFilterChange(name, value). It is a callback function that will be invoked when a 
          //filter value changes in the <Filter> component.
          //In the parent component, there should be a function called handleFilterChange that takes name and value as parameters. 
          //When the filter value changes in the <Filter> component, the onFilterChange prop will be triggered, and it will call the handleFilterChange function with 
          //the respective name and value arguments.
          //Overall, this code ensures that when a filter value changes in the <Filter> component, the handleFilterChange function is triggered, and it updates the filters object and calls the onFilterChange callback to inform the parent component about the filter change.
          <Filter filters={filters} onFilterChange={(name,value) => handleFilterChange(name, value)} />
          </Grid>

          <Grid item xs={9} style={{marginTop: "1rem"}}>
            //The <ProductCard> component is being rendered with the following props:
            //filteredProducts: It receives the filteredProducts variable as a prop.
            //This variable represents an array of products that have been filtered based on certain criteria, such as search terms or selected filters.
            //handleAddToCart: It receives the handleAddToCart function as a prop. This function is responsible for adding a product to the shopping cart. 
            //When the user interacts with the <ProductCard> component, such as clicking on an "Add to Cart" button, this function will be invoked with the 
            //selected product as an argument.
            <ProductCard 
            filteredProducts={filteredProducts} handleAddToCart={handleAddToCart}
              />
          </Grid>
          </Grid>

         </Grid>
      </Grid>
      </div>
    );
  };
  
  export default Products;
