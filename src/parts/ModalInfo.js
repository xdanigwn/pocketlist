import React, { useEffect, useContext} from "react";
import Modal from "elements/Modal";
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";
import AuthContext from "context/AuthContext"

function ModalInfo(props) {
    const { fetchPage, page } = props; 

    const { userId }  = useContext(AuthContext)

    useEffect(() => {
        // console.log(page)
        fetchPage(
            `https://admin-pocketlist.herokuapp.com/api/v1/balanceinfo/${userId}`, "balanceInfo");
        
    }, [fetchPage, userId])

    if (!page.hasOwnProperty("balanceInfo")) return null;

    // console.log(page.balanceInfo)
    return (
      <>
        <Modal
          title='Info'
          sub-title={props.subTitle}
          onCancel={props.onCancel}
          modalVisible={props.modalVisible}
          className='modalTrans'>

         
          <table className="table table-striped table-bordered mt-2">
          <thead className="thead-brown">
              <tr>
                  <th className="text-center" colSpan="2">Debit</th>
              </tr>
          </thead>
          <thead className="thead-orange">
              <tr>
                  <th className="text-center" width="60%">Account</th>
                  <th className="text-center">Nominal</th>
              </tr>
          </thead> 
          <tbody>
          {
              page.balanceInfo.accDebit.map((accDebit,id) =>
              <tr key={id}>
                  <td className="text-left"><img alt="" width="32px" src={`${`http://localhost:3000`}/${accDebit.accImageUrl}`}></img>&nbsp;&nbsp;{accDebit.accName}</td>
                  <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(accDebit.balance) )}</td>
              </tr>
              )
          }
          { <tr><td colSpan="2" className="text-center font-weight-bold">Total : {("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(page.balanceInfo.sumDebit) )}</td></tr> } 
          </tbody>
          </table>

          <table className="table table-striped table-bordered mt-2">
          <thead className="thead-brown">
              <tr>
                  <th className="text-center" colSpan="2">Credit</th>
              </tr>
          </thead>
          <thead className="thead-orange">
              <tr>
                  <th className="text-center" width="60%">Account</th>
                  <th className="text-center">Nominal</th>
              </tr>
          </thead> 
          <tbody>
          {
              page.balanceInfo.accCredit.map((accCredit,id) =>
              <tr key={id}>
                  <td className="text-left"><img alt="" width="32px" src={`${`http://localhost:3000`}/${accCredit.accImageUrl}`}></img>&nbsp;&nbsp;{accCredit.accName}</td>
                  <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(accCredit.balance) )}</td>
              </tr>
              )
          }
          { <tr><td colSpan="2" className="text-center font-weight-bold">Total : {("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(page.balanceInfo.sumCredit) )}</td></tr> } 
          </tbody>
          </table>          
        </Modal>
      </>
    );
  }

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { fetchPage })(ModalInfo); // fetchpage dimasukan kedalam page
