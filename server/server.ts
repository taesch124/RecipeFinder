const express = require('express');
const path = require('path');
import { searchRecipes } from './api/spoonacular';

const recipeRouter = require('./routes/recipes');

const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use('/api/recipes', recipeRouter);

//production mode
if(process.env.NODE_ENV === 'production') {
    server.use(express.static(path.resolve(__dirname, '..', 'build')));
    
    server.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
} else {
    server.use(express.static(path.resolve(__dirname, '..', 'public')));
        
    server.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
    });
}
  
server.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});