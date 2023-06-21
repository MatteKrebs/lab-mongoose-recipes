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
    return Recipe.insertMany(data);
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
      return Recipe.create(firstRecipe);
  })
  .then((allRecipes) => {
    allRecipes.forEach((recipe) => {
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
    }) 
  .then(() => {
    console.log("Rigatoni has been update!")
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => {
    console.log('Carrot Cake removed.')
   // mongoose.connection.close()?
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
