import React, { Component } from "react";
import Modal from "elements/Modal";
import { TabHeader, TabContents } from "elements/Tab";
import TabExpense from "parts/TabExpense";
import TabIncome from "parts/TabIncome";
import TabTransfer from "./TabTransfer";
// import moment from "moment";

class ModalTrans extends Component {
  render() {
    const { acc } = this.props;
    const { ctgInc } = this.props;
    const { ctg } = this.props;
    // const { accTrf } = this.props;

    return (
      <>
        <Modal
          title='Add Transaction'
          sub-title={this.props.subTitle}
          onCancel={this.props.onCancel}
          modalVisible={this.props.modalVisible}
          className='modalTrans'>
          <div className='modal-subtitle'>
            On account : &nbsp;
            <img
              alt={`${acc.name}`}
              className='left mr-2'
              src={`${`https://admin-pocketlist.herokuapp.com`}/${acc.image}`}
              style={{ width: "24px" }}
            />
            {acc.name}
          </div>
          <ul className='nav nav-pills mb-3 justify-content-between' id='pills-tab' role='tablist'>
            <TabHeader title='income'>Income</TabHeader>
            <TabHeader title='expense' activeTabs>Expense</TabHeader>
            <TabHeader title='transfer'>Transfer</TabHeader>
          </ul>
          <div className='tab-content' id='pills-tabContent'>
            <TabContents title='income'>
              <TabIncome acc={acc} ctg={ctgInc} onCancel={this.props.onCancel}  refreshPage={this.props.refreshPage}></TabIncome>
            </TabContents>
            <TabContents title='expense' activeConts>
              <TabExpense acc={acc} ctg={ctg} onCancel={this.props.onCancel}  refreshPage={this.props.refreshPage}></TabExpense>
            </TabContents>
            <TabContents title='transfer'>
              <TabTransfer acc={acc} onCancel={this.props.onCancel}  refreshPage={this.props.refreshPage}></TabTransfer>
            </TabContents>
          </div>
        </Modal>
      </>
    );
  }
}
export default ModalTrans