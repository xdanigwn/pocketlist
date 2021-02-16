import React, { Component } from "react";
import iconDate from "assets/images/icons-operator/Date.svg";
import iconDetail from "assets/images/icons-operator/Detail-dark.svg";
import iconIncome from "assets/images/icons-overview/Income.svg";
import iconExpense from "assets/images/icons-overview/Expense.svg";

export default class PanelPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAccountVis: false,
      incomeUpdated: false,
      expenseUpdated: false
    };
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleAccountClose = this.toggleAccountClose.bind(this);
  }

  toggleAccount = () => {
    this.setState((prevState) => ({
      modalAccountVis: !prevState.modalAccountVis,
    }));
  };
  toggleAccountClose = () => {
    this.setState({ modalAccountVis: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { data } = this.props;
   
    // JIKA ADA PERUBAHAN DATA, MAKA FADE IN
    if (prevProps.data.sumIncome !== data.sumIncome) {
        this.setState({ incomeUpdated : !prevState.incomeUpdated }, () => {
          setTimeout(() => { this.setState({ incomeUpdated: false }) }, 1000);
        })
    }
    if (prevProps.data.sumExpense !== data.sumExpense) {
      this.setState({ expenseUpdated : !prevState.expenseUpdated }, () => {
        setTimeout(() => { this.setState({ expenseUpdated: false }) }, 1000);
      })
  }
  };

  render() {
    return (
      <div className='col-6 col-md-8 mt-3 no-paddingleft-mob no-paddingleft'>
        <div className='card bg-white text-dark'>
          <div className='card-header'>Personal</div>
          <div className='card-body text-center main'>
            <div className='row'>
              <div className='col-md-6 mt-1'>
                <div className='row'>
                  <div className='col'>
                    <img src={iconIncome} alt='income' />
                  </div>
                  <div className='col-7 pl-0'>
                    <h6>Income</h6>
                    <span className={` ${this.state.incomeUpdated ? "fade-effect" : ""}`}>Rp. {Intl.NumberFormat("en-US", { style: "decimal" }).format(this.props.data.sumIncome)}</span>
                  </div>
                </div>
              </div>
              <div className='col-md-6 mt-1'>
                <div className='row'>
                  <div className='col'>
                    <img src={iconExpense} alt='income' />
                  </div>
                  <div className='col-7 pl-0'>
                    <h6>Expense</h6>
                    <span className={` ${this.state.expenseUpdated ? "fade-effect" : ""}`} >Rp. {Intl.NumberFormat("en-US", { style: "decimal" }).format(this.props.data.sumExpense)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-footer text-right'>
            <a href='/#'>
              <img src={iconDate} alt='detail' />
            </a>
            <a href='/#'>
              <img src={iconDetail} alt='detail' />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
