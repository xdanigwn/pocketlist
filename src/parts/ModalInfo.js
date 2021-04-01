import React, { Component } from "react";
import Modal from "elements/Modal";
// import moment from "moment";

class ModalInfo extends Component {
  render() {

    return (
      <>
        <Modal
          title='Info'
          sub-title={this.props.subTitle}
          onCancel={this.props.onCancel}
          modalVisible={this.props.modalVisible}
          className='modalTrans'>
          {/* <div className='modal-subtitle'>
            On account : &nbsp;
            <img
              alt={`${}`}
              className='left mr-2'
              src={`${`https://admin-pocketlist.herokuapp.com`}/${}`}
              style={{ width: "24px" }}
            />
            {}
          </div> */}
         
          <div className='tab-content' id='pills-tabContent'>
           
          </div>
        </Modal>
      </>
    );
  }
}
export default ModalInfo