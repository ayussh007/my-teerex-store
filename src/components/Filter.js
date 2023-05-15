import React from 'react';
import "./Filter.css";

//receives two props: filters and onFilterChange
const Filter = ({ filters, onFilterChange }) => {
    
    //ensures that when a filter value changes in the <Filter> component, the handleFilterChange function is triggered, and it updates the filters object and calls 
    //the onFilterChange callback to inform the parent component about the filter change.
    // Event handler for filter changes
    const handleFilterChange = (event) => {
        // Get the name and value from the event target
        const name = event.target.name;
        console.log(name,"name ");
        const value = event.target.value;
        console.log(value, "color");
        
        // Create updated filters object with the new filter value
        const updatedFilters = {
            ...filters,
            [name]: value
          };
          // Call the onFilterChange callback to notify parent component
          //This callback is responsible for handling the filter change in the parent component.
          onFilterChange(name, value);
        console.log("updated filter:", updatedFilters)
      };

  return (
    <div>
<div className='firstFilter'>
      <h4 className='headings'>Colour</h4>
        <div className="check">
            //The onChange event is attached to the handleFilterChange function, which will be called when the checkbox value changes. 
            <input type="checkbox" name="color"  onChange={handleFilterChange} value="Red"  /> <label>Red</label>
        </div>
        <div className="check">
            <input type="checkbox" name="color" onChange={handleFilterChange}  value="Blue" /> <label>Blue</label>
        </div>
        <div className="check">
            <input type="checkbox" name="color" onChange={handleFilterChange} value="Green" /> <label>Green</label>
        </div>
</div>

<div className="secondFilter">
<h4 className='headings'>Gender</h4>
<div className="check">
<input type="checkbox" name="gender" onChange={handleFilterChange} value="Men" /> <label>Men</label>
</div>
<div className="check">
<input type="checkbox" name="gender" onChange={handleFilterChange} value="Women" /> <label>Women</label>
</div>
</div>

<div className="thirdFilter">
                <h4 className='headings'>Price</h4>
                <div className="check">
                <input type="checkbox" name="price" onChange={handleFilterChange} value={'0-250'} /> <label>0- Rs 250</label>
                </div>
                <div className="check">
                <input type="checkbox" name="price" onChange={handleFilterChange} value={"251-450"}/> <label>251- Rs 450</label>
                </div>
                <div className="check">
                <input type="checkbox" name="price" onChange={handleFilterChange} value={'451-600'} /> <label> 451- Rs 600</label>
                </div>
 </div>
       
<div className="fourthFilter">
                <h4 className='headings'>Type</h4>
                <div className="check">
                <input type="checkbox" name="type" onChange={handleFilterChange} value='Polo' /> <label htmlFor="">Polo</label>
                </div>
                <div className="check">
                <input type="checkbox" name="type" onChange={handleFilterChange} value="Hoodie" /> <label htmlFor="">Hoodie</label>
                </div>
                <div className="check">
                <input type="checkbox" name="type" onChange={handleFilterChange} value='Basic' /> <label htmlFor="">Basic</label>
                </div>
</div>

    </div>
  );
};

export default Filter;
