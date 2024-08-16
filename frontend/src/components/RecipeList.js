import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const RecipeList = () => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/recipes')
			.then((response) => {
				setRecipes(response.data.recipes);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<Container>
			<h1>Recipes List</h1>
			<div>
				{recipes.map((recipe, index) => {
					return (
						<ItemWrapper key={index}>
							<span>Title: {recipe.title}</span>
							<span>Ingredients: {recipe.ingredients}</span>
							<span>Steps: {recipe.steps}</span>
						</ItemWrapper>
					);
				})}
			</div>
		</Container>
	);
};

export default RecipeList;

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
