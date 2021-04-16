import React, { useState, useEffect, useRef } from "react";
import Button from "elements/Button";
import iconDate from "assets/images/icons-operator/Date.svg";
import ModalDate from "parts/ModalDate";
// import iconDetail from "assets/images/icons-operator/Detail-dark.svg";
import iconIncome from "assets/images/icons-overview/Income.svg";
import iconExpense from "assets/images/icons-overview/Expense.svg";
// import { ModalHooks } from "elements/ModalHooks";
import { Link } from "react-router-dom";
import moment from "moment";

function PanelPersonal(props) {
  
  const [incomeUpdated, setIncUpdated] = useState(false);
  const [expenseUpdated, setExpUpdated] = useState(false);
  const [modalBalanceVis, setModalBalanceVis] = useState(false);
  
  const prevIncRef = usePrevious(props.data.sumIncome) // Menyimpan nilai lama total income
  const prevExpRef = usePrevious(props.data.sumExpense) // Menyimpan nilai lama total expense
  
  const [dateFrom, setDateFrom] = useState(moment().startOf("month").format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));

  const toggleBalance = () => {
    setModalBalanceVis(prev => !prev);
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect (() => { // COMPDIDUPDATE FOR FUNCTION COMP => APABILA ADA PERUBAHAN PADA COMPONENT TERSEBUT
    // const { data } = this.props;
   
    // JIKA ADA PERUBAHAN DATA, MAKA FADE IN
    // if (prevProps.data.sumIncome !== data.sumIncome) {
    //     this.setState({ incomeUpdated : !prevState.incomeUpdated }, () => {
    //       setTimeout(() => { this.setState({ incomeUpdated: false }) }, 1000);
    //     })
    // }
    // if (prevProps.data.sumExpense !== data.sumExpense) {
    //   this.setState({ expenseUpdated : !prevState.expenseUpdated }, () => {
    //     setTimeout(() => { this.setState({ expenseUpdated: false }) }, 1000);
    //   })
    // }
    
    if (prevIncRef !== undefined){
      if (prevIncRef !== props.data.sumIncome) {
        // console.log(prevTotalRef)
       
        setIncUpdated(true) // UPDATE MENJADI STATUS TRUE = FADE EFFECT
        setTimeout(() => { setIncUpdated(false) }, 2000); // KEMBALIKAN KE STATUS FALSE
      }
      // console.log(prevTextRef)
    }
    
    if (prevExpRef !== undefined){
      if (prevExpRef !== props.data.sumExpense) {
        // console.log(prevTotalRef)
       
        setExpUpdated(true) // UPDATE MENJADI STATUS TRUE = FADE EFFECT
        setTimeout(() => { setExpUpdated(false) }, 2000); // KEMBALIKAN KE STATUS FALSE
      }
      // console.log(prevTextRef)
    }

  }, [ prevIncRef, prevExpRef, props.data.sumIncome, props.data.sumExpense]);

    return (
      <div className='col-6 col-md-8 mt-3 no-paddingleft-mob no-paddingleft'>
        <div className='card bg-white text-dark'>
          <div className='card-header'>Personal</div>
          <div className='card-body text-center main'>
            <div className='row'>
              <div className='col-md-6 mt-1'>
                <div className='row'>
                  <div className='col'>
                    <Link to={`/personalincdtl/5f6f68fc9fd56b291005a357/${dateFrom}/${dateTo}`} refreshPage={props.refreshPage}>
                      <img src={iconIncome} alt='income' />
                    </Link>
                  </div>
                  <div className='col-7 pl-0'>
                    <h6>Income</h6>
                    <span className={` ${incomeUpdated ? "fade-effect" : ""}`}>Rp. {Intl.NumberFormat("en-US", { style: "decimal" }).format(props.data.sumIncome)}</span>
                  </div>
                </div>
              </div>
              <div className='col-md-6 mt-1'>
                <div className='row'>
                  <div className='col'>
                    <Link to={`/personalexpdtl/5f6f68fc9fd56b291005a357/${dateFrom}/${dateTo}`} refreshPage={props.refreshPage}>
                      <img src={iconExpense} alt='expense' />
                    </Link>
                  </div>
                  <div className='col-7 pl-0'>
                    <h6>Expense</h6>
                    <span className={` ${expenseUpdated ? "fade-effect" : ""}`} >Rp. {Intl.NumberFormat("en-US", { style: "decimal" }).format(props.data.sumExpense)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <div className='float-left mt-2 ml-2'><small><i>Filter : {moment(dateFrom, 'YYYY-MM-DD').format("DD MMM YYYY")} - {moment(dateTo, 'YYYY-MM-DD').format("DD MMM YYYY")} </i></small></div>
            <div className='float-right'>

              <Button href='/' type='link' onClick={toggleBalance}>
                <img src={iconDate} alt='detail' />
              </Button>

            </div>
          </div>
        </div>

        <ModalDate
          title='Date'
          onCancel={toggleBalance}
          refreshPage={props.refreshPage}
          modalVisible={modalBalanceVis}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          className='ModalDate'
        ></ModalDate>
      </div>
    );
}


export default PanelPersonal;