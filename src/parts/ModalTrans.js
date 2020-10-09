import React, { Component } from "react";
import Modal from "elements/Modal";
import { TabHeader, TabContents } from "elements/Tab";

export default class ModalTrans extends Component {
  render() {
    return (
      <>
        <Modal
          title="Add Transaction"
          sub-title={this.props.subTitle}
          hasConfirm
          onConfirm={this.props.onConfirm}
          onCancel={this.props.onCancel}
          modalVisible={this.props.modalVisible}
          className="modalTrans"
        >
          <div className="modal-subtitle">
            On account : &nbsp;
            <img
              alt={`${this.props.selectedAccName}`}
              className="left mr-2"
              src={this.props.selectedAccImage} />
            {this.props.selectedAccName}
          </div>
          <ul
            className="nav nav-pills mb-3 justify-content-between"
            id="pills-tab"
            role="tablist"
          >
            <TabHeader title="income">Income</TabHeader>
            <TabHeader title="expense" activeTabs>
              Expense
            </TabHeader>
            <TabHeader title="transfer">Transfer</TabHeader>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <TabContents title="income">Isi Tab 1</TabContents>
            <TabContents title="expense" activeConts>
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="ammount"
                    className="col-3 col-form-label "
                  >
                    Ammount
                  </label>
                  <div className="col-9">
                    <input
                      type="number"
                      className="form-control"
                      id="ammount"
                      name="ammount"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="category"
                    className="col-3 col-form-label"
                  >
                    Category
                  </label>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword1"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="desc"
                    className="col-3 col-form-label">
                    Desc
                    </label>
                  <div className="col-9">
                    <textarea className="form-control" id="desc" name="desc" rows="3">
                    </textarea>
                  </div>
                </div>
              </form>
            </TabContents>
            <TabContents title="transfer">Isi Tab 3</TabContents>
          </div>
        </Modal>
      </>
    );
  }
}
