export const userActionTypes = {
    USER_LOGGED_IN: '[Login] User Logged In',
    USER_LOGGED_OUT: '[Logout] User Logged Out'
};

export const userLoggedIn = () => ({
    type: userActionTypes.USER_LOGGED_IN
});

export const userLoggedOut = () => ({
    type: userActionTypes.USER_LOGGED_OUT
});

