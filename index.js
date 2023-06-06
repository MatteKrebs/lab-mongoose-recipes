const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';
mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    return Recipe.deleteMany()
  })
  .then(() => {
    const firstRecipe = new Recipe({
      title: 'Dog Cookies',
      level: 'Easy Peasy',
      ingredients: ['1 cup flour', '1 cup dry food', '2 eggs', '2 carrots', '20 oz fuet', 'Any table scraps of meat'],
      cuisine: 'For dogs!',
      dishType: 'other',
      duration: 30,
      creator: 'Matt Krebs',
    });
      return firstRecipe.save();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
