import React, { useState, useEffect } from 'react';
import axios from 'axios';
import urlParams from './SpoonApiOptions';

const SearchForm = () => {
    const [result,setResult] = useState([])
    useEffect(()=>{
      axios.get('/axiosget').then(res => setResult(res.data))
    },[])
    return(
      <div>
      <h2>This is the Search Form</h2>
      <div>
        {console.log(result)}
        {result && result.length
          ? result.map((recipe) => <div key={recipe.id}>{recipe.title}</div>)
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
    )
  }



export default SearchForm;

// https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}
