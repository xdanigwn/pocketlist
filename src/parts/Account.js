import React, { Component } from "react";
import Button from "elements/Button";
import iconTrans from "assets/images/icons-operator/Transaction.svg";
import iconDetailLight from "assets/images/icons-operator/Detail-dark.svg";
import ModalTrans from "parts/ModalTrans";
import { Link } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super();
    this.state = {
      acc: {
        id: "",
        name: "",
        image: "",
        balance: "",
      },
    };
    this.modalAccountVis = false;
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleAccountClose = this.toggleAccountClose.bind(this);
  }

  componentDidMount = () => {
    const { data } = this.props;

    // console.log(this.props.dataAccTrf);

    this.setState({ 
      ...this.state.acc,
      acc: {
        _id: data[0]._id,
        name: data[0].accName,
        image: data[0].accImageUrl,
        balance: "( Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(data[0].balance) + " )",
      },
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    setTimeout(() => {
      const { data } = this.props;
      for (let i = 0; i < data.length; i++){
        if (prevProps.data[i].balance !== data[i].balance) {
          this.setState({
            ...this.state.acc,
            acc: {
              _id: data[i]._id,
              name: data[i].accName,
              image: data[i].accImageUrl,
              balance: "( Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(data[i].balance) + " )",
            
            },
          });
        }
      }
    }, 5000);
  };

  toggleAccount = () => {
    this.setState((prevState) => ({
      modalAccountVis: !prevState.modalAccountVis,
    }));
  };
  toggleAccountClose = () => {
    this.setState({ modalAccountVis: false });
  };

  selectAccount = (e) => {
    this.setState({
      ...this.state,
      acc: {
        ...this.state.acc,
        _id: e.currentTarget.getAttribute("data-id"),
        name: e.currentTarget.getAttribute("data-name"),
        image: e.currentTarget.getAttribute("data-image"),
        balance: e.currentTarget.getAttribute("data-balance"),
      },
    });
  };

  render() {
    const { acc } = this.state;
    // const { account } = this.props;
    // console.log(acc.balance);
    return (
      <>
        <div className='col-12 mt-3 mb-3'>
          <div className='card text-dark'>
            <div className='card-header '>Account</div>
            <div className='card-body bg-white text-dark'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-10 col-7'>
                    <div className='dropdown'>
                      <button
                        className='btn-dropdown btn-block dropdown-toggle d-flex justify-content-between'
                        type='button'
                        id='dropdownMenu1'
                        data-toggle='dropdown'>
                        <div className='badge'>
                          <img
                            alt=''
                            className='left mr-2'
                            src={`${`https://admin-pocketlist.herokuapp.com`}/${acc.image}`}
                            style={{ width: "24px" }}
                          />
                          <span className="hidden-mobile">{acc.name} - </span>
                          <span>{acc.balance}</span>
                        </div>
                      </button>
                      <ul className='dropdown-menu ' aria-labelledby='dropdownMenu2' style={{ width: "100%" }}>
                        {this.props.data.map((account, index) => {
                          return (
                            <li
                              key={account._id}
                              href='/#'
                              className='dropdown-item d-flex justify-content-between'
                              onClick={this.selectAccount}
                              data-id={account._id} 
                              data-name={account.accName}
                              data-image={account.accImageUrl}
                              data-balance={`${`( Rp.`}${Intl.NumberFormat("en-US", { style: "decimal" }).format(account.balance)} )`}>
                              <div className='badge'>
                                <img
                                  alt=''
                                  style={{ width: "32px" }}
                                  className='left mr-2'
                                  src={`${`https://admin-pocketlist.herokuapp.com`}/${account.accImageUrl}`}
                                />
                                <span className="hidden-mobile">{account.accName} </span>
                              </div>
                              <div className='badge d-flex align-items-center'>{`${`( Rp.`}${Intl.NumberFormat("en-US", { style: "decimal" }).format(
                                account.balance
                              )} )`}</div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-1 col'>
                    <Button href='/landingpage' type='link' className='btn btn-block btn-warning' onClick={this.toggleAccount}>
                      <img src={iconTrans} alt='Transaction'></img>
                    </Button>
                  </div>

                  <div className='col-lg-1 col'>
                    <Link to={"/accountdtl/" + acc._id} className='btn btn-block btn-white'>
                      <img src={iconDetailLight} alt='Transaction'></img>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.modalAccountVis &&  */}
        <ModalTrans
          onCancel={this.toggleAccountClose}
          refreshPage={this.props.refreshPage}
          modalVisible={this.state.modalAccountVis}
          subTitle={this.props.modalAccountVis}
          category={this.props.modalAccountVis}
          className='modalAccount'
          acc={this.state.acc}
          ctgInc={this.props.datactgInc}
          ctg={this.props.datactg}
          ></ModalTrans>
        {/* } */}
      </>
    );
  }
}

export default Account;
