import { ADD_TRANS } from "../types";

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TRANS:
            return action.payload;
        default:
            return state
    }
}