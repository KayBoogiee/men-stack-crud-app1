import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({title:'', description:'', ingredients:'', steps:''});
  const navigate = useNavigate();

  const handleChange = e => setRecipe({...recipe, [e.target.name]: e.target.value});
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/recipes', recipe)
      .then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required/>
      <input name="description" placeholder="Description" onChange={handleChange} required/>
      <input name="ingredients" placeholder="Ingredients" onChange={handleChange} required/>
      <input name="steps" placeholder="Steps" onChange={handleChange} required/>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
