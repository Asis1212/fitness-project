import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeItem from './components/RecipeItem';

const router = () => {
	return (
		<Routes>
			<Route exact path='/create-recipe' element={<RecipeForm />} />
			<Route exact path='/recipes' element={<RecipeList />} />
			<Route exact path='/recipes/:id' element={<RecipeItem />} />
		</Routes>
	);
};

export default router;
