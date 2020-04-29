import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form() {
    const initialFormState = {
        name: '',
        email: '',
        password: '',
        terms: '',
    }
    const [post, setPost] = useState([])

    const [serverError, setServerError] = useState('')

    const [formState, setFormState] = useState(initialFormState)

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [errors, setErrors] = useState(initialFormState)
    
    const formSchema = yup.object().shape({
        name: yup.string().required('Your Name is a Required Field'),
        email: yup.string().required().email('You Must Have an Email Address'),
        password: yup.string().required(),
        terms: yup.boolean().oneOf([true], "You must accept the terms and conditions to continue."),
    })

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({...errors, [e.target.name]: ''})
            })
            .catch(err => {
                setErrors({...errors, [e.target.name]: err.errors[0]})
            })
    }

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("h", formState)
            .then(response => {
            setPost(response.data);
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: ""
            });
            setServerError(null);
            })
            .catch(err => {
            setServerError("oops! something happened!");
        });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = { ...formState, [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value }
        validateChange(e);
        setFormState(newFormData);
    }

    return (
        <form onSubmit={formSubmit}>
            {serverError ? <p className='error'>{serverError}</p> : null}
            <label htmlFor='name'>
                Name 
                <input
                    type='text'
                    name='name'
                    onChange={inputChange}
                    value={formState.name}
                />            
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null }
            </label>
            <label htmlFor='email'>
                Email Address 
                <input
                    id='email'
                    type='text'
                    name='email'
                    onChange={inputChange}
                    value={formState.email}
                />            
                {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null }
            </label>
            <label htmlFor='password'>
                Password 
                <input
                    type='password'
                    name='password'
                    onChange={inputChange}
                    value={formState.password}
                    minLength='8' required
                />            
                {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null }
            </label>
            <label htmlFor='terms' className='terms'>
                <input
                    type='checkbox'
                    name='terms'
                    checked={formState.terms}
                    onChange={inputChange}
                />
                Terms & Conditions
            </label>
            <br></br>
            <button disabled={isButtonDisabled} type='submit'>Submit</button>
        </form>
    )
}