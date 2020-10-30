const resumen = "CHANGE_RESUMEN"
const resetResumen = "RESET_RESUMEN"

export const changeResumen = () => ({ type: resumen })
// export const resetResumen = { type: resetResumen }

const initialState = {
    resumen: true,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case resumen:
            return { ...state, resumen: !state.resumen }

        case resetResumen:
            return { ...state, resumen: initialState.resumen }
        default:
            return state
    }
}
