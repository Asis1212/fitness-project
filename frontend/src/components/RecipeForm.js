import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const RecipeForm = () => {
	const location = useLocation();
	const props = location.state;

	const navigate = useNavigate();

	const title = useRef();
	const ingredients = useRef();
	const steps = useRef();

	const submitHandler = (e) => {
		e.preventDefault();

		if (props) {
			axios
				.patch(`http://localhost:8000/recipes/${props.id}`, {
					title: title.current.value,
					ingredients: ingredients.current.value,
					steps: steps.current.value,
				})
				.then(() => {
					navigate('/recipes');
				})
				.catch((error) => console.log(error));
		} else {
			axios
				.post('http://localhost:8000/recipes', {
					title: title.current.value,
					ingredients: ingredients.current.value,
					steps: steps.current.value,
				})
				.then(() => {
					navigate('/recipes');
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<Container>
			<h1>Create New Recipe</h1>
			<Form onSubmit={submitHandler}>
				<InputWrapper>
					<label>Title:</label>
					<input type='text' className='input' ref={title} defaultValue={props?.title ? props.title : ''} />
				</InputWrapper>
				<InputWrapper>
					<label>ingredients:</label>
					<input type='text' className='input' ref={ingredients} defaultValue={props?.ingredients ? props.ingredients : ''} />
				</InputWrapper>
				<InputWrapper>
					<label>steps:</label>
					<textarea className='text-area' ref={steps} defaultValue={props?.steps ? props.steps : ''} />
				</InputWrapper>
				<button type='submit'>Send</button>
			</Form>
		</Container>
	);
};

export default RecipeForm;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	margin-bottom: 10px;

	.input {
		width: 250px;
		padding: 3px 5px;
		outline: none;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}

	.text-area {
		height: 200px;
		width: 250px;
		padding: 3px 5px;
		outline: none;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}
`;
