import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes`)
      .then(res => setRecipe(res.data.find(r => r._id === id)));
  }, [id]);

  const handleChange = e => setRecipe({...recipe, [e.target.name]: e.target.value});
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/recipes/${id}`, recipe)
      .then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={recipe.title || ''} onChange={handleChange} required/>
      <input name="description" value={recipe.description || ''} onChange={handleChange} required/>
      <input name="ingredients" value={recipe.ingredients || ''} onChange={handleChange} required/>
      <input name="steps" value={recipe.steps || ''} onChange={handleChange} required/>
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipe;
