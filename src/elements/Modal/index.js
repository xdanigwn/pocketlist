import React from "react";

export default function Modal(props) {
  //   console.log(props);
  return (
    <>
      <div
        className={`backdrop ${props.modalVisible ? "fade-in" : "fade-out"}`}
      >
        <div
          id="MyModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          className={` ${props.modalVisible ? "fade-in" : "fade-out"}`}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {props.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={props.onCancel}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{props.children}</div>
              <div className="modal-footer">
                {props.hasConfirm && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={props.onConfirm}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
