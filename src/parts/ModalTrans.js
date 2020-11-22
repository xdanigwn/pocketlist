import React, { Component } from "react";
import Modal from "elements/Modal";
import { connect } from "react-redux";
import { TabHeader, TabContents } from "elements/Tab";

import { addTrans } from "store/actions/addtrans";

class ModalTrans extends Component {
  state = {
    data: {
      transDate: "11-22-2020",
      transDesc: "",
      ammount: 0,
      operator: "+",
      accountId: "5f6f690a9fd56b291005a358",
      categoryId: "",
      userId: "5f6f68fc9fd56b291005a357",
    },
  };

  handleChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleOnSubmit = () => {
    // event.preventDefault();
    const { data } = this.state;

    // this.props.submitTrans(data);

    // const payload = new FormData();
    // payload.append("transDate", "11-22-2020");
    // payload.append("transDesc", data.desc);
    // payload.append("ammount", data.ammount);
    // payload.append("operator", "+");
    // payload.append("accountId", "5f6f690a9fd56b291005a358");
    // payload.append("categoryId", data.category);
    // payload.append("userId", "5f6f68fc9fd56b291005a357");

    // console.log(data);
    this.props.addTrans(data);

    // this.setState({
    //   ammount: "",
    //   category: "",
    //   desc: "",
    // });
  };

  render() {
    return (
      <>
        <Modal
          title='Add Transaction'
          sub-title={this.props.subTitle}
          hasConfirm
          onConfirm={this.props.onConfirm}
          onCancel={this.props.onCancel}
          modalVisible={this.props.modalVisible}
          className='modalTrans'>
          <div className='modal-subtitle'>
            On account : &nbsp;
            <img
              alt={`${this.props.selectedAccName}`}
              className='left mr-2'
              src={`${`https://admin-pocketlist.herokuapp.com`}/${
                this.props.selectedAccImage
              }`}
              style={{ width: "24px" }}
            />
            {this.props.selectedAccName}
          </div>
          <ul
            className='nav nav-pills mb-3 justify-content-between'
            id='pills-tab'
            role='tablist'>
            <TabHeader title='income'>Income</TabHeader>
            <TabHeader title='expense' activeTabs>
              Expense
            </TabHeader>
            <TabHeader title='transfer'>Transfer</TabHeader>
          </ul>
          <div className='tab-content' id='pills-tabContent'>
            <TabContents title='income'>Isi Tab 1</TabContents>
            <TabContents title='expense' activeConts>
              <form method='POST' onSubmit={this.handleOnSubmit}>
                <div className='form-group row'>
                  <label htmlFor='ammount' className='col-3 col-form-label '>
                    Ammount
                  </label>
                  <div className='col-9'>
                    <input
                      type='number'
                      className='form-control'
                      id='ammount'
                      name='ammount'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <label htmlFor='category' className='col-3 col-form-label'>
                    Category
                  </label>
                  <div className='col-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='categoryId'
                      name='categoryId'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className='form-group row'>
                  <label htmlFor='desc' className='col-3 col-form-label'>
                    Desc
                  </label>
                  <div className='col-9'>
                    <textarea
                      className='form-control'
                      id='transDesc'
                      name='transDesc'
                      rows='3'
                      onChange={this.handleChange}></textarea>
                  </div>
                </div>

                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={(event) => this.handleOnSubmit(event)}>
                  Submit
                </button>
              </form>
            </TabContents>
            <TabContents title='transfer'>Isi Tab 3</TabContents>
          </div>
        </Modal>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

export default connect(null, { addTrans })(ModalTrans);
