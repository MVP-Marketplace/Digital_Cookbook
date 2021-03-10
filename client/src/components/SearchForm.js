
import React, { useState} from 'react';
import axios from 'axios';
import urlParams from './SpoonApiOptions';

const SearchForm = () => {

  // set the state for the search and the api data
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  // function to make api call
  const handleSearch = async () =>{
    const results = await axios.get(
      `/api/search?${search}`,
    )
    setData(results.data.results)
  }

  // function handle submit from the form
  const handleSubmit = (event) =>{
    event.preventDefault();
    handleSearch();
  }

  //function to handle the change in the search form 
  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>This is the Search Form</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          onChange={searchChange}
        />
        <br></br>
        <input type="submit" id="submit" />
      </form>
      </div>
      <div>
        {data && data.length
          ? data.map((recipe) => <div key={recipe.id}>{recipe.title}</div>)
          : 'Loading Recipes...'}
      </div>
      <section class="border p-4 mb-4 d-flex justify-content-center">
        <div style={{ width: '22rem' }}>
          <select class="select">
            {urlParams.dietTypes.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
          <div class="select-custom-content"></div>
        </div>
      </section>
      <div class="form-check">
        {urlParams.cuisines.map((type) => (
          <>
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {type}
            </label>
          </>
        ))}
      </div>
      <div class="form-check">
        {urlParams.allergies.map((type) => (
          <>
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {type}
            </label>
          </>
        ))}
      </div>
      <div class="form-check">
        {urlParams.mealTypes.map((type) => (
          <>
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {type}
            </label>
          </>
        ))}
      </div>
      <div class="form-check">
        {urlParams.ingredients.map((type) => (
          <>
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <img />
            <label class="form-check-label" for="flexCheckDefault">
              {type}
            </label>
          </>
        ))}
      </div>
    </div>
  );

export default SearchForm;
