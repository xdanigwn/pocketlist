import { FETCH_PAGE } from "../types";
import axios from "axios";

export const fetchPage = (page) => (dispatch) => {
  return axios
    .get(`https://admin-pocketlist.herokuapp.com/api/v1/overview`, null, {
      crossdomain: true,
    })
    .then((response) => {
      dispatch({
        type: FETCH_PAGE,
        payload: {
          [page]: response.data,
        },
      });
    });
};
