import React, {useContext} from "react";
import Modal from "elements/Modal";
import { TabHeader, TabContents } from "elements/Tab";
import TabExpense from "parts/TabExpense";
import TabIncome from "parts/TabIncome";
import TabTransfer from "./TabTransfer";
import moment from "moment";
import AuthContext from "context/AuthContext"

function ModalTrans(props) {
    const { acc, ctgInc, ctg } = props; 
    const dateFrom = moment().startOf("month").format("YYYY-MM-DD");
    const dateTo = moment().format("YYYY-MM-DD");

    const { userId }  = useContext(AuthContext)

    return (
      <>
        <Modal
          title='Add Transaction'
          sub-title={props.subTitle}
          onCancel={props.onCancel}
          modalVisible={props.modalVisible}
          className='modalTrans'>
          <div className='modal-subtitle'>
            On account : &nbsp;
            <img
              alt={`${acc.name}`}
              className='left mr-2'
              src={`${`http://localhost:3000`}/${acc.image}`}
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
              <TabIncome  acc={acc} 
                          ctg={ctgInc} 
                          onCancel={props.onCancel} 
                          refreshPage={props.refreshPage}
                          dateFrom={dateFrom}
                          dateTo={dateTo}
                          userId={userId}
                          ></TabIncome>
            </TabContents>
            <TabContents title='expense' activeConts>
              <TabExpense acc={acc} 
                          ctg={ctg} 
                          onCancel={props.onCancel} 
                          refreshPage={props.refreshPage}
                          dateFrom={dateFrom}
                          dateTo={dateTo}
                          userId={userId}
                          ></TabExpense>
            </TabContents>
            <TabContents title='transfer'>
              <TabTransfer  acc={acc} 
                            onCancel={props.onCancel} 
                            refreshPage={props.refreshPage}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            userId={userId}
                            ></TabTransfer>
            </TabContents>
          </div>
        </Modal>
      </>
    );
  }
export default ModalTrans