import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import { API_KEY, BASE_URL, checkApiKey, getApiConfig } from '../utils/api';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 12;

    const fetchRecipes = async (searchQuery = '') => {
        if (!API_KEY) {
            setError(
                'API key is missing. Please check your environment variables.'
            );
            setLoading(false);
            return;
        }
        try {
            checkApiKey();
            setLoading(true);

            // Check cache first
            const cacheKey = `recipes-${searchQuery}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                setRecipes(JSON.parse(cachedData));
                setError(null);
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `${BASE_URL}/complexSearch`,
                getApiConfig({
                    query: searchQuery,
                    number: 100,
                    addRecipeInformation: true,
                    instructionsRequired: true,
                    fillIngredients: true
                })
            );

            // Cache the results
            localStorage.setItem(
                cacheKey,
                JSON.stringify(response.data.results)
            );
            setRecipes(response.data.results);
            setError(null);
        } catch (err) {
            console.error('API Error:', err);
            setError(
                err.response?.status === 402
                    ? 'Daily API limit reached. Please try again tomorrow.'
                    : 'Failed to fetch recipes. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!API_KEY) {
            setError(
                'API key is missing. Please check your environment variables.'
            );
            setLoading(false);
            return;
        }
        fetchRecipes();
    }, []);

    const handleSearch = (query) => {
        fetchRecipes(query);
        setCurrentPage(1);
    };

    // Get current recipes for pagination
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading delicious recipes...</p>
            </div>
        );
    }

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home">
            <SearchBar onSearch={handleSearch} />
            {recipes.length === 0 ? (
                <div className="no-results">
                    <p>No recipes found. Try a different search term!</p>
                </div>
            ) : (
                <>
                    <div className="recipes-grid">
                        {currentRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalRecipes={recipes.length}
                        recipesPerPage={recipesPerPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
