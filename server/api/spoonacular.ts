const Dotenv = require('dotenv').config();
const keys = require('../config/keys.ts');
const axios = require('axios');
const moment = require('moment');

import { APISuccess, APIFailure } from '../api.d/apiResponse';
import { generateAPIError } from '../helpers/errorHandler';
import { RecipeCuisine } from './cuisineEnum';

const baseUrl = 'https://api.spoonacular.com';
const apiKey = keys.spoonacular;

export const searchRecipes = async (query: string): Promise<APISuccess | APIFailure> => {
    const url = `${baseUrl}/recipes/complexSearch?query=${query}&addRecipeInformation=true&apiKey=${apiKey}`;

    try {
        const response  = await axios({
            url, 
            method: 'GET',
        });
        console.log(response.data);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return generateAPIError(error);
    }
}

export const getRecipeById = async (recipeId: string): Promise<APISuccess | APIFailure> => {
    const url = `${baseUrl}/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;

    try {
        const response = await axios({
            url,
            method: 'GET',
        });
        console.log(response.data);

        return {
            success: true,
            data: response.data,
        };
    } catch(error) {
        return generateAPIError(error);
    }
}

export const featuredRecipes = async (): Promise<APISuccess | APIFailure> => {
    const today = moment().startOf('day');
    const startOfYear = moment().startOf('year').startOf('day');
    const diff = today.diff(startOfYear, 'days') % (Object.keys(RecipeCuisine).length);
    const cuisine = Object.values(RecipeCuisine)[diff];
    const url = `${baseUrl}/recipes/random?tags=main course,${cuisine}&number=5&apiKey=${apiKey}`;

    try {
        const response = await axios({
            url,
            method: 'GET',
        });
        console.log(response.data);

        return {
            success: true,
            data: response.data,
        }
    } catch(error) {
        return generateAPIError(error);
    }
}