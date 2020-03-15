import React, { FormEvent } from 'react';

import { post } from '../services/superagent';


export const Login: React.FC = (props: any) => {
    const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as any;
        const username = target.elements.username.value.trim();
        const password = target.elements.password.value.trim();
        post('users/login', { username, password }).then((response: any) => {
            const json = response.body;
            localStorage.setItem('token', json.token)
            props.history.push('/drafts');
        });
    }

    return (
        <div>
            <form action="" onSubmit={onFormSubmit}>
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}