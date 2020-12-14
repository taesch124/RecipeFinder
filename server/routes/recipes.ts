const express = require('express');
import {
    searchRecipes,
    getRecipeById,
    featuredRecipes,
} from '../api/spoonacular';
import { APISuccess, APIFailure } from '../api.d/apiResponse';
import { generateAPIError } from '../helpers/errorHandler';

const router = express.Router();

router.get('/search', async (req, res): Promise<APISuccess | APIFailure> => {
    try {
        const query = req.query?.query;
        if(!query) {
            const errorResponse = generateAPIError('No query string provided');
            res.json(errorResponse);
            return errorResponse;
        }

        console.log(query);
        const apiResponse = await searchRecipes(query);
        res.json(apiResponse);
        return apiResponse;
    } catch (error) {
        const errorResponse = generateAPIError(error);
        res.json(errorResponse);
        return errorResponse;
    }
});

router.get('/find', async (req, res): Promise<APISuccess | APIFailure> => {
    try {
        const recipeId = req.query?.recipeId;
        if(!recipeId) {
            const errorResponse = generateAPIError('No recipe ID provided');
            res.json(errorResponse);
            return errorResponse;
        }

        console.log(recipeId);
        const apiResponse = await getRecipeById(recipeId);
        res.json(apiResponse);
        return apiResponse;
    } catch(error) {
        const errorResponse = generateAPIError(error);
        res.json(errorResponse);
        return errorResponse; 
    }
});

router.get('/featured', async (req, res): Promise<APISuccess | APIFailure> => {
    try {
        const apiResponse = await featuredRecipes();
        res.json(apiResponse);
        return apiResponse;
    } catch(error) {
        const errorResponse = generateAPIError(error);
        res.json(errorResponse);
        return errorResponse;
    }
})

module.exports = router;