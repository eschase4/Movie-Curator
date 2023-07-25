import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = (props) => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await addProfile({
                variables: { ...formState },
            });

            Auth.addProfile(data.addProfile.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div>
            <div className='mt-2 mb-2'>
                <h4 className="card-header bg-dark text-light text-center p-2">Sign Up</h4>
            </div>
            <div className="card-body">
                {data ? (
                    <p>
                        Success! You may now head{' '}
                        <Link to="/">back to the homepage.</Link>
                    </p>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Your Username"
                                name="username"
                                type="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="******"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                )}

                {error && (
                    <div className="my-3 p-3 bg-danger text-white">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
