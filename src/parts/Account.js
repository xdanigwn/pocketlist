import React, { Component } from "react";
import iconTrans from "assets/images/icons-operator/Transaction.svg";
import iconDetailLight from "assets/images/icons-operator/Detail-dark.svg";
import ModalTrans from "parts/ModalTrans";
// import Modal from 'elements/Modal'
// import iconCIMB from "assets/images/icons-account/Cimb.svg"
// import iconJenius from "assets/images/icons-account/Jenius.svg"

export default class PanelAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccName: "Pilih...",
      selectedAccImage: "",
      selectedAccBalance: "",
      modalAccountVis: false,
    };
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleAccountClose = this.toggleAccountClose.bind(this);
  }

  selectAccount = (e) => {
    this.setState({ selectedAccName: e.currentTarget.getAttribute("data-value") });
    this.setState({ selectedAccImage: e.currentTarget.getAttribute("data-image") });
    this.setState({ selectedAccBalance: e.currentTarget.getAttribute("data-balance") });
  };

  toggleAccount = () => {
    this.setState((prevState) => ({
      modalAccountVis: !prevState.modalAccountVis,
    }));
  };
  toggleAccountClose = () => {
    this.setState({ modalAccountVis: false });
  };

  render() {
    return (
      <>
        <div className="col-12 mt-3 mb-3">
          <div className="card text-dark">
            <div className="card-header ">Account</div>
            <div className="card-body bg-white text-dark">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-7">
                    <div className="dropdown border">
                      <button
                        className="btn btn-block dropdown-toggle d-flex justify-content-between"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                      >
                        <div className="badge">
                          <img alt="" className="left mr-2" src={this.state.selectedAccImage} style={{ width: "24px" }} />
                          <span>{this.state.selectedAccName}</span>&nbsp; - &nbsp;
                          <span>{this.state.selectedAccBalance}</span>
                        </div>
                      </button>
                      <ul
                        className="dropdown-menu "
                        aria-labelledby="dropdownMenu2"
                        style={{ width: "100%" }}
                      >
                        {this.props.data.map((account, index) => {
                          return (
                            <li
                              key={account.accName}
                              href="/#"
                              className="dropdown-item d-flex justify-content-between"
                              onClick={this.selectAccount}
                              data-value={account.accName}
                              data-image={account.accImageUrl}
                              data-balance={account.balance}
                            >
                              <div className="badge">
                                <img alt="" className="left mr-2" src={account.accImageUrl} />
                                <span> {account.accName}</span>
                              </div>
                              <div className="badge d-flex align-items-center">
                                {account.balance}
                              </div>
                            </li>
                          );
                        })}
                      </ul >
                    </div>
                  </div>
                  <div className="col-lg-1 col">
                    <a
                      href="/#"
                      className="btn btn-block btn-warning"
                      onClick={this.toggleAccount}
                    >
                      <img src={iconTrans} alt="Transaction"></img>
                    </a>
                  </div>

                  <div className="col-lg-1 col">
                    <a href="/#" className="btn btn-block btn-white">
                      <img src={iconDetailLight} alt="Transaction"></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.modalAccountVis &&  */}
        <ModalTrans
          onCancel={this.toggleAccountClose}
          onConfirm={this.toggleAccount}
          modalVisible={this.state.modalAccountVis}
          subTitle={this.props.modalAccountVis}
          category={this.props.modalAccountVis}
          className="modalAccount"
          selectedAccName={this.state.selectedAccName}
          selectedAccImage={this.state.selectedAccImage}
        >
        </ModalTrans>
        {/* } */}
      </>
    );
  }
}
