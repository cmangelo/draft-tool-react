import React, { FormEvent } from 'react';

const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as any;
    const username = target.elements.username.value.trim();
    const password = target.elements.password.value.trim();
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const json = await response.json();
    localStorage.setItem('token', json.token)
}

export const Login: React.FC = () => {
    return (
        <div>
            <form action="" onSubmit={onFormSubmit}>
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}