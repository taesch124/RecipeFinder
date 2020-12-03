const express = require('express');
import {
    searchRecipes,
} from '../api/spoonacular';
import { APISuccess, APIFailure } from '../api.d/apiResponse';

const router = express.Router();

router.get('/search', async (req, res): Promise<APISuccess | APIFailure> => {
    try {
        const apiResponse = await searchRecipes();
        return apiResponse;
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
});

module.exports = router;