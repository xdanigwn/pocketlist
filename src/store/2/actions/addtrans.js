import { ADD_TRANS } from "../types";
import axios from "configs/axios";

export const checkoutBooking = (payload) => (dispatch) => {
  dispatch({
    type: ADD_TRANS,
    payload: payload,
  });
};

export const submitBooking = (payload) => () => {
  return axios.post(`/booking-page`, payload, {
    headers: { contentType: "multipart/form-data" },
  });
};
