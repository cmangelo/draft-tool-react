export const uiActionTypes = {
    SCREEN_RESIZE: '[UI] Screen Resize'
};

export const resizeScreen = (screenWidth: number) => ({
    type: uiActionTypes.SCREEN_RESIZE,
    payload: {
        screenWidth
    }
});
