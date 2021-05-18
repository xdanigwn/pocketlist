import { ADD_TRANS } from "../types";
import axios from "axios";

// export const addTrans = (payload) => (dispatch) => {
//   dispatch({
//     type: ADD_TRANS,
//     payload: payload,
//   });
// };

export const addTrans = (transObj) => {
  // return (dispatch) => {
  //   axios
  //     .post(`http://localhost:3000/api/v1/add-trans`, payload)
  //     .then((response) => {
  //       // console.log(response);
  //       dispatch({
  //         type: SUBMIT_TRANS,
  //         payload: response.data,
  //       });
  //     });
  // };

  return (dispatch) => {
    return axios
      .post(
        `http://localhost:3000/api/v1/addtrans`,
        transObj,
        {
          headers: {
            "content-type": "application/json;charset=utf-8",
          },
          // proxy: {
          //   host: "localhost",
          //   port: 3000,
          // },
        }
      )
      .then(() => {
        dispatch({
          type: ADD_TRANS,
          payload: transObj,
        });
        // console.log(response.data);
      })
      .catch((error) => console.log(transObj));
  };
};
