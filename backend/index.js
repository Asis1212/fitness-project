const fs = require('fs');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const recipes = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

app.get('/recipes', (req, res) => {
	res.status(200).json({
		status: 'success',
		recipes,
	});
});

app.post('/recipes', (req, res) => {
	const newId = recipes[recipes.length - 1].id + 1;
	const newRecipe = Object.assign({ id: newId }, req.body);

	recipes.push(newRecipe);

	fs.writeFile('./data.json', JSON.stringify(recipes), (err) => {
		res.status(201).json({
			status: 'success',
			data: {
				recipe: newRecipe,
			},
		});
	});
});

app.patch('/recipes/:id', (req, res) => {
	if (req.params.id * 1 > recipes.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	const updateRecipe = Object.assign({ id: req.params.id * 1 }, req.body);
	const index = recipes.findIndex((recipe) => recipe.id === req.params.id * 1);
	recipes[index] = updateRecipe;

	fs.writeFile('./data.json', JSON.stringify(recipes), (err) => {
		res.status(201).json({
			status: 'success',
			data: {
				recipe: updateRecipe,
			},
		});
	});
});

app.delete('/recipes/:id', (req, res) => {
	if (req.params.id * 1 > recipes.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	const index = recipes.findIndex((recipe) => recipe.id === req.params.id);
	recipes.splice(index, 1);

	fs.writeFile('./data.json', JSON.stringify(recipes), (err) => {
		res.status(204).json({
			status: 'success',
			data: null,
		});
	});
});

app.listen(8000, () => {
	console.log('Listening on requests on port 8000');
});
