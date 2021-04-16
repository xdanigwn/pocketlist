import React, { Component } from "react";
import Modal from "elements/Modal";
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";

class ModalInfo extends Component {

  refreshDetail = () => {
    this.props.fetchPage(
        `http://localhost:3000/api/v1/balanceinfo/5f6f68fc9fd56b291005a357`, "balanceInfo");

  }
  componentDidMount(){
      this.refreshDetail();
  }

  render() {

    const { page } = this.props; 

    if (!page.hasOwnProperty("balanceInfo")) return null;

    // console.log(page.balanceInfo)

    return (
      <>
        <Modal
          title='Info'
          sub-title={this.props.subTitle}
          onCancel={this.props.onCancel}
          modalVisible={this.props.modalVisible}
          className='modalTrans'>

         
          <table className="table table-striped table-bordered mt-2">
          <thead className="thead-orange">
              <tr>
                  <th className="text-center" colSpan="2">Debit</th>
              </tr>
          </thead>
          <thead className="thead-dark">
              <tr>
                  <th className="text-center" width="60%">Account</th>
                  <th className="text-center">Nominal</th>
              </tr>
          </thead> 
          <tbody>
          {
              page.balanceInfo.accDebit.map((accDebit,id) =>
              <tr key={id}>
                  <td className="text-left"><img alt="" width="32px" src={`${`https://admin-pocketlist.herokuapp.com`}/${accDebit.accImageUrl}`}></img>&nbsp;&nbsp;{accDebit.accName}</td>
                  <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(accDebit.balance) )}</td>
              </tr>
              )
          }
          { <tr><td colSpan="2" className="text-center font-weight-bold">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(page.balanceInfo.sumDebit) )}</td></tr> } 
          </tbody>
          </table>

          <table className="table table-striped table-bordered mt-2">
          <thead className="thead-orange">
              <tr>
                  <th className="text-center" colSpan="2">Credit</th>
              </tr>
          </thead>
          <thead className="thead-dark">
              <tr>
                  <th className="text-center" width="60%">Account</th>
                  <th className="text-center">Nominal</th>
              </tr>
          </thead> 
          <tbody>
          {
              page.balanceInfo.accCredit.map((accCredit,id) =>
              <tr key={id}>
                  <td className="text-left"><img alt="" width="32px" src={`${`https://admin-pocketlist.herokuapp.com`}/${accCredit.accImageUrl}`}></img>&nbsp;&nbsp;{accCredit.accName}</td>
                  <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(accCredit.balance) )}</td>
              </tr>
              )
          }
          { <tr><td colSpan="2" className="text-center font-weight-bold">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(page.balanceInfo.sumCredit) )}</td></tr> } 
          </tbody>
          </table>          
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { fetchPage })(ModalInfo); // fetchpage dimasukan kedalam page
