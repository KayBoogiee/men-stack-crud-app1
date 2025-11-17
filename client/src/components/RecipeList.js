import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteRecipe = (id) => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => setRecipes(recipes.filter(r => r._id !== id)));
  };

  return (
    <div>
      <h1>Recipes</h1>
      <Link to="/add">Add Recipe</Link>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/edit/${recipe._id}`}>Edit</Link>
            <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
