import React from "react";
const AllRecipies = ({data}) =>{
    return (
        <div className="container">
          {data.recipe && data.recipe.length
            ? data.recipe.map(recipe => (
                <a href={`/recipe/${recipe.id}`} key={recipe.id} >
                  <div className="card">
                    <p>
                      {recipe.title}
                    <img src={recipe.image} alt={"An image of the character" + recipe.title} />
                    </p>
                  </div>
                </a>
              ))
            : "Nothing found :-/"}
        </div>
      );
}

export default AllRecipies