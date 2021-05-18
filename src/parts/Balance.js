import React, { useState, useEffect, useRef } from "react";
import iconDetail from "assets/images/icons-operator/Detail-white.svg";
import ModalInfo from "parts/ModalInfo";
import Button from "elements/Button";
import moment from "moment";

 function Balance(props) {
  const [textUpdated, setTextUpdated] = useState(false);
  const [modalBalanceVis, setModalBalanceVis] = useState(false);
  const prevTotalRef = usePrevious(props.data.totaBalance) // Menyimpan nilai lama total balance
  // const prevTextRef = usePrevious(textUpdated)
  
  const toggleBalance = () => {
    setModalBalanceVis(prev => !prev);
  }

  // const toggleBalanceClose = () => {
  //   setModalBalanceVis(false);
  // }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
  useEffect ( () => {
    // console.log(prevTotalRef)
    // JIKA ADA PERUBAHAN DATA, MAKA FADE IN
 
    if (prevTotalRef !== undefined){
      if (prevTotalRef !== props.data.totaBalance) {
        // console.log(prevTotalRef)
       
        setTextUpdated(true) // UPDATE MENJADI STATUS TRUE = FADE EFFECT
        setTimeout(() => { setTextUpdated(false) }, 3000); // KEMBALIKAN KE STATUS FALSE
      }
      // console.log(prevTextRef)
    }
    
  }, [ prevTotalRef, props.data.totaBalance]);
    
    return (
      <>
        <div className='col-6 col-md-4 mt-3'>
          <div className='card bg-primary text-white '>
            <div className='card-header'>Balance</div>
            <div className='card-body main align-items-center text-center'>
              <h4 className={`card-text mt-4 mt-md-0 ${textUpdated ? "fade-effect" : ""}`}>Rp. {Intl.NumberFormat("en-US", { style: "decimal" }).format(props.data.totaBalance)}</h4>
              <span>Today : {moment().format("DD MMM YYYY")} </span>
            </div>
            <div className='card-footer text-right'>
              <Button href='/landingpage' type='link' onClick={toggleBalance}>
                <img src={iconDetail} alt='detail' />
              </Button>
            </div>
          </div>
        </div>
        {/* {this.state.modalBalanceVis &&  */}
        <ModalInfo
          title='Info'
          onCancel={toggleBalance}
          modalVisible={modalBalanceVis}
          className='modalInfo'
        ></ModalInfo>

        {/* <Modal title='Info' onCancel={toggleBalanceClose} modalVisible={modalBalanceVis} className='modalBalance'></Modal> */}
        {/* } */}
      </>
    );
  }


export default Balance;