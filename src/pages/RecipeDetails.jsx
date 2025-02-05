import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL, checkApiKey, getApiConfig } from '../utils/api';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!API_KEY) {
            setError(
                'API key is missing. Please check your environment variables.'
            );
            setLoading(false);
            return;
        }

        const fetchRecipeDetails = async () => {
            try {
                checkApiKey();
                setLoading(true);

                // Check cache first
                const cacheKey = `recipe-${id}`;
                const cachedData = localStorage.getItem(cacheKey);

                if (cachedData) {
                    setRecipe(JSON.parse(cachedData));
                    setError(null);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${BASE_URL}/${id}/information`,
                    getApiConfig()
                );

                // Cache the results
                localStorage.setItem(cacheKey, JSON.stringify(response.data));
                setRecipe(response.data);
                setError(null);
            } catch (err) {
                console.error('API Error:', err);
                setError(
                    err.response?.status === 402
                        ? 'Daily API limit reached. Please try again tomorrow.'
                        : 'Failed to fetch recipe details. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading recipe details...</p>
            </div>
        );
    }

    if (error) return <div className="error">{error}</div>;
    if (!recipe) return null;

    return (
        <div className="recipe-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back to Recipes
            </button>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />

            <div className="recipe-info">
                <div className="recipe-meta">
                    <span>Ready in {recipe.readyInMinutes} minutes</span>
                    <span>•</span>
                    <span>Serves {recipe.servings}</span>
                    {recipe.vegetarian && (
                        <span className="tag vegetarian">Vegetarian</span>
                    )}
                    {recipe.vegan && <span className="tag vegan">Vegan</span>}
                    {recipe.glutenFree && (
                        <span className="tag gluten-free">Gluten Free</span>
                    )}
                </div>
                <div
                    className="recipe-summary"
                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
            </div>

            <div className="recipe-ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            </div>

            <div className="recipe-instructions">
                <h2>Instructions</h2>
                <div
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
            </div>
        </div>
    );
};

export default RecipeDetails;
