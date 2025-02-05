import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p>
                    {recipe.readyInMinutes} minutes • {recipe.servings} servings
                </p>
                <Link to={`/recipe/${recipe.id}`} className="view-recipe">
                    View Recipe
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
