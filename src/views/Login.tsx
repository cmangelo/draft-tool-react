import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../actions/user';
import { getIsUserLoggedIn } from '../reducers/user';
import { post } from '../services/superagent';

export const Login: React.FC = (props: any) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const isUserLoggedIn = useSelector(getIsUserLoggedIn);

    if (isUserLoggedIn)
        props.history.push('/drafts');

    const dispatch = useDispatch();
    const onLoginFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as any;
        const username = target.elements.username.value.trim();
        const password = target.elements.password.value.trim();
        post('users/login', { username, password }).then((response: any) => {
            loginSuccess(response);
        }, error => {
            if (error.status === 400) {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('Something went wrong. Please try again');
            }
        });
    }

    const onCreateAccountFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as any;
        const name = target.elements.name.value.trim();
        const username = target.elements.username.value.trim();
        const password = target.elements.password.value.trim();
        post('users', { username, password, name }).then((response: any) => {
            loginSuccess(response);
        }, error => {
            if (error.status === 400) {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('Something went wrong. Please try again');
            }
        });
    }

    const loginSuccess = (response: any) => {
        const json = JSON.stringify(response.body);
        localStorage.setItem('user', json)
        props.history.push('/drafts');
        dispatch(loginUser());
    }

    return (
        <div className="Login">
            <img src={process.env.PUBLIC_URL + 'img/default-monochrome.svg'} alt="" />
            <div className="toggle">
                <span className={showLogin ? 'active' : ''} onClick={() => setShowLogin(true)}>Log In</span>
                <span className={!showLogin ? 'active' : ''} onClick={() => setShowLogin(false)}>Create Account</span>
            </div>
            {showLogin &&
                <form action="" onSubmit={onLoginFormSubmit}>
                    <input type="text" placeholder="Username" name="username" />
                    <input type="password" placeholder="Password" name="password" />
                    <div className="error-message">{errorMessage}</div>
                    <button type="submit">Submit</button>
                </form>
            }
            {!showLogin &&
                <form action="" onSubmit={onCreateAccountFormSubmit}>
                    <input type="text" placeholder="Name" name="name" />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="password" placeholder="Password" name="password" />
                    <div className="error-message">{errorMessage}</div>
                    <button type="submit">Submit</button>
                </form>
            }
        </div>
    );
}