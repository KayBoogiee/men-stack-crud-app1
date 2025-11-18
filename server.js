const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - FIXED FOR HEROKU
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: String,
  steps: String,
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

// CRUD Routes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ... all your CRUD routes above ...

// DELETE route (this is the last CRUD route)
app.delete('/recipes/:id', async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
// ←←← PASTE THE NEW ROOT ROUTE BLOCK RIGHT HERE ↓↓↓↓↓↓↓↓↓↓↓↓
// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

app.get('/', (req, res) => {
  res.send(`
    <h1>MEN Stack Recipe CRUD App is LIVE!</h1>
    <p>API is working perfectly on Heroku!</p>
    <h3>Available endpoints:</h3>
    <ul>
      <li>GET /recipes → List all recipes</li>
      <li>POST /recipes → Create new recipe</li>
      <li>PUT /recipes/:id → Update recipe</li>
      <li>DELETE /recipes/:id → Delete recipe</li>
    </ul>
    <p><strong>Test with Postman or Thunder Client</strong></p>
    <small>Deployed on: ${new Date().toLocaleString()}</small>
  `);
});

app.use('/', (req, res, next) => {
  if (req.path === '/' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed — Only GET works on the homepage' });
  }
  next();
});

// This line stops the "Method Not Allowed" error forever
app.all('/', (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed – Only GET is allowed on the root page');
  }
});

// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});