export const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
export const BASE_URL = 'https://api.spoonacular.com/recipes';

export const checkApiKey = () => {
    if (!API_KEY) {
        throw new Error(
            'API key is missing. Please check your environment variables.'
        );
    }
};

export const getApiConfig = (params = {}) => ({
    params: {
        apiKey: API_KEY,
        ...params
    }
});
