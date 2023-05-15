import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory} from "react-router-dom";
import "./Header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//The children prop is being used to render any content that is passed between the opening and closing tags of the Header component when it is used in another component. 
//This allows you to customize and include additional content within the Header component.
const Header = ({children}) => {

  const history = useHistory()

  return (
      <Box className="header">
        { <Box className="header-title" onClick={() => history.push("/", {from: "Header" })}>TeeRex Store
        </Box> }
        {children}
        <Stack direction="row" spacing={1}>
          <Button variant="text" style={{textDecoration: 'underline' , color: 'black', fontWeight: 'bold'}} className= "product-btn"  onClick={() => history.push("/", {from: "Header" })}>Products</Button>
          <Button style={{fontWeight: "bold"}} onClick={() => history.push("/cart", {from: "Header" })}>
            <ShoppingCartIcon style={{color: "black", backgroundColor: "lightgrey"}}/>
          </Button>
        </Stack>    
        </Box>
  )
};

export default Header;
