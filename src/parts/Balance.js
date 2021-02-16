import React, { Component } from "react";
import iconDetail from "assets/images/icons-operator/Detail-white.svg";
import Modal from "elements/Modal";
import Button from "elements/Button";

export default class PanelBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalBalanceVis: false,
      textUpdated : false
    };
    this.toggleBalance = this.toggleBalance.bind(this);
    this.toggleBalanceClose = this.toggleBalanceClose.bind(this);
  }

  toggleBalance = () => {
    this.setState((prevState) => ({
      modalBalanceVis: !prevState.modalBalanceVis,
    }));
  };
  toggleBalanceClose = () => {
    this.setState({ 
      modalBalanceVis: false,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { data } = this.props;
   
    // JIKA ADA PERUBAHAN DATA, MAKA FADE IN
    if (prevProps.data.totaBalance !== data.totaBalance) {
    
        this.setState({ textUpdated : !prevState.textUpdated }, () => {
          setTimeout(() => { this.setState({ textUpdated: false }) }, 1000);
        })
    }
  };

  render() {
    // console.log(this.state.textUpdated)
    return (
      <>
        <div className='col-6 col-md-4 mt-3'>
          <div className='card bg-primary text-white '>
            <div className='card-header'>Balance</div>
            <div className='card-body main align-items-center text-center'>
              <h4 className={`card-text mt-4 mt-md-0 ${this.state.textUpdated ? "fade-effect" : ""}`}>Rp. {Intl.NumberFormat("en-US", { style: "decimal" }).format(this.props.data.totaBalance)}</h4>
              <span>{new Date().toJSON().slice(0, 10).split("-").reverse().join("/")}</span>
            </div>
            <div className='card-footer text-right'>
              <Button href='/' type='link' onClick={this.toggleBalance}>
                <img src={iconDetail} alt='detail' />
              </Button>
            </div>
          </div>
        </div>
        {/* {this.state.modalBalanceVis &&  */}
        <Modal title='Info' onCancel={this.toggleBalanceClose} modalVisible={this.state.modalBalanceVis} className='modalBalance'></Modal>
        {/* } */}
      </>
    );
  }
}
