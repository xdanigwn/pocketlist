import { ADD_TRANS } from "../types";
// import { SUBMIT_TRANS } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_TRANS:
      return action.payload;
    default:
      return state;
  }
}
