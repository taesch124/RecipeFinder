const Dotenv = require('dotenv').config();
const keys = require('../config/keys.ts');
const axios = require('axios');

import { APISuccess, APIFailure } from '../api.d/apiResponse';

const baseUrl = 'https://api.spoonacular.com';
const apiKey = keys.spoonacular;

export const searchRecipes = async ():Promise<APISuccess | APIFailure> => {
    const query = 'query=burger';

    const url = `${baseUrl}/recipes/complexSearch?${query}&apiKey=${apiKey}`;

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
        console.log(error)
        return {
            success: false,
            error: error,
        }
    }
}