export const userActionTypes = {
    USER_LOGGED_IN: '[Login] User Logged In',
    USER_LOGGED_OUT: '[Logout] User Logged Out'
};

export const loginUser = () => ({
    type: userActionTypes.USER_LOGGED_IN
});

export const logoutUser = () => ({
    type: userActionTypes.USER_LOGGED_OUT
});

