import { ADD_TRANS } from "../types";

export const addTrans = (payload) => (dispatch) => {
    dispatch({
        type: ADD_TRANS,
        payload: payload
    })
}