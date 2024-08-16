import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeItem = () => {
	const navigate = useNavigate();

	const [recipe, setRecipe] = useState({});

	const { id } = useParams();

	useEffect(() => {
		axios
			.get('http://localhost:8000/recipes')
			.then((response) => {
				const recipes = response.data.recipes;
				const recipe = recipes.find((recipe) => recipe.id === id * 1);

				setRecipe(recipe);
			})
			.catch((error) => console.log(error));
	}, []);

	const updateHandler = () => {
		navigate('/create-recipe', { state: { id: recipe.id, title: recipe.title, ingredients: recipe.ingredients, steps: recipe.steps } });
	};

	const deleteHandler = () => {
		axios
			.delete(`http://localhost:8000/recipes/${id}`)
			.then(() => {
				navigate('/recipes');
			})
			.catch((error) => console.log(error));
	};

	return (
		<Container>
			<h1>Recipes Item</h1>
			<ItemWrapper>
				<span>Title: {recipe?.title}</span>
				<span>Ingredients: {recipe?.ingredients}</span>
				<span>Steps: {recipe?.steps}</span>
			</ItemWrapper>
			<div>
				<button onClick={updateHandler}>Update</button>
				<button onClick={deleteHandler}>Delete</button>
			</div>
		</Container>
	);
};

export default RecipeItem;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;

const ItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
	border-radius: 5px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 5px 8px;
`;
