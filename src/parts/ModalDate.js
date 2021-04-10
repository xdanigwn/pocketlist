import React from "react";
import Modal from "elements/Modal";
// import moment from "moment";

function ModalDate(props) {
    const handleOnSubmit = (e) => {
      alert('halo');
      props.refreshPage();
      props.onCancel();
    }

    return (
      <>
        <Modal
          title='Filter Date'
          sub-title={props.subTitle}
          onCancel={props.onCancel}
          modalVisible={props.modalVisible}
          className='modalTrans'>

            <form id='Dateform' className='container p-3 mt-n3' method='POST' onSubmit={handleOnSubmit}>
              <div className='form-group row'>
                <label htmlFor='transDate' className='col-3 col-form-label '>
                  From
                </label>
                <div className='col-9'>
                <input type="date" id="date" className='form-control' value={props.dateFrom}></input>
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='transDate' className='col-3 col-form-label '>
                  To
                </label>
                <div className='col-9'>
                <input type="date" id="date" className='form-control' value={props.dateTo}></input>
                </div>
              </div>

              <button type='button' className='btn btn-secondary float-right' data-dismiss='modal' onClick={(e) => handleOnSubmit(e)}>
                  Submit
              </button>
            </form>
         
          

        </Modal>
      </>
    );
  }
export default ModalDate