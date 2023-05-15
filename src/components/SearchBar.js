import React from "react";
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
 // State for the search term
  const [searchTerm, setSearchTerm] = React.useState("");
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Invoke the onSearch callback with the search term
    onSearch(searchTerm);
  };
  
  // function is called whenever the value of the input field changes. 
  const handleChange = (event) => {
    // Update the search term state
    setSearchTerm(event.target.value);
  };

//The JSX code renders a form element with an input field and a submit button. The input field's value is set to the searchTerm state, and the handleChange function is 
//called on each change. The submit button triggers the handleSubmit function when clicked.
  return (
    <form className="searchbar-form" onSubmit={handleSubmit}>
      <label>
        <input placeholder="Search for products" type="text" value={searchTerm} onChange={handleChange} />
      </label>
      <button type="submit" style={{margin: "5px"}}>
      <PageviewRoundedIcon style={{color: "black", backgroundColor: "darkgrey", margin: "2px"}}/>
      </button>
    </form>
  );
};

export default SearchBar;
