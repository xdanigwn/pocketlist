import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { addTrans } from "store/actions/addtrans";
import { fetchPage } from "store/actions/page";
import moment from "moment";
import NumberFormat from 'react-number-format'

function TabTransfer(props) {
  // const [username , setUser ] = useState("");
  // const { acc } = props;
  const { page, acc, fetchPage, addTrans, onCancel } = props; 
  const isHasAccDropDown = page.hasOwnProperty("accDropDown")

  const [transDate , setTransDate ] = useState(moment().format("YYYY-MM-DD"));
  const [transDesc , setTransDesc ] = useState("");
  const [ammount , setAmmount ] = useState("");
  const [operator  ] = useState(""); // DIGENERATE LANGSUNG DI API = (-)
  const [accountId, setAccountId ] = useState("");
  const [categoryId ] = useState("5f76b4626d06cb30700703a6"); // OTOMATIS CATEGORY TRANSFER. PADA COMP INI TIDAK ADA PERUBAHAN 
  const [userId  ] = useState(props.userId);
  const [accountIdTo , setAccountIdTo ] = useState("");

  // STATE UNTUK DROPDOWN - UNTUK MENGISI ACCOUNT TUJUAN
  const [accDropDownId , setAccDropDownId ] = useState("");
  const [accDropDownName , setAccDropDownName ] = useState("");
  const [accDropDownImage , setAccDropDownImage ] = useState("");

  // MULTIPLE USE EFFECT IS FOR DIFFERENT PURPOSE
  useEffect (() => {
    // STATE DI DESTRUCTURE PADA SAAT COMP DID UPDATE
    if (acc._id !== undefined){
      setAccountId(acc._id)
      fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdd/${userId}/${acc._id}`, "accDropDown"); // FILL PAGE & HASDROPDOWN
    };
  }, [
    acc._id,
    fetchPage,
    userId
  ]);

  useEffect (() => {
    // console.log(page)     
    if(isHasAccDropDown){
     
      setAccountIdTo(page.accDropDown.accTransfer[0]._id)
          
      setAccDropDownId(page.accDropDown.accTransfer[0]._id);
      setAccDropDownName(page.accDropDown.accTransfer[0].accName);
      setAccDropDownImage(page.accDropDown.accTransfer[0].accImageUrl);
    }
  }, [isHasAccDropDown, page]) // PAGE SUDAH DIISI PADA USE EFE
  
  const selectCategory = (e) => {
    // JIKA ADA PERUBAHAN DROPDWON
    // fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdd/${acc._id}`, "accDropDown");
    // console.log("change")
    setAccountIdTo(e.currentTarget.getAttribute("data-id"))
    setAccDropDownId(e.currentTarget.getAttribute("data-id"));
    setAccDropDownName(e.currentTarget.getAttribute("data-name"));
    setAccDropDownImage(e.currentTarget.getAttribute("data-image"));
  };

  const handleOnSubmit = (e) => {
    const trans = { 
       transDate, 
       transDesc, 
       ammount, 
       operator, 
       accountId, 
       categoryId, 
       userId, 
       accountIdTo };
    console.log(trans);
    addTrans(trans).then(() => {
      // alert("Data Tersimpan!");
        
      document.getElementById("trfFrom").reset();
      fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdd/${acc._id}`, "accDropDown");
      onCancel();
    });
  };

  

  // if(page.hasOwnProperty("accDropDown")){ console.log(acc._id); console.log("ITEM DD PERTAMA : " + accDropDownName); console.log(page);};
  if (!isHasAccDropDown) return null;
  // console.log(page)

    return (
      <>
        <form id='trfFrom' method='POST' onSubmit={handleOnSubmit}>
            <div className='col-9'>
              <input type='hidden' className='form-control' id='accountId' name='accountId' onChange={(e) => setAccountId(e.target.value)} defaultValue={acc._id} />
            </div>
            <div className='form-group row'>
                <label htmlFor='transDate' className='col-3 col-form-label '>
                Date
                </label>
                <div className='col-9'>
                <input type='date' className='form-control' id='transDate' name='transDate' value={transDate} onChange={(e) => setTransDate(e.target.value)} />
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor='ammount' className='col-3 col-form-label '>
                Ammount
                </label>
                <div className='col-9'>
                {/* <input type='number' className='form-control' id='ammount' name='ammount' onChange={this.handleChange} /> */}
                <NumberFormat className='form-control' thousandSeparator={true} id='ammount' name="ammount" value={ammount} onChange={(e) => setAmmount(e.target.value.replace(/,/g,''))} />
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor='category' className='col-3 col-form-label'>
                To Acc
                </label>
                    <div className='col-9'>
                    {/* DROPDOWN CATEGORY */}
                    <div className='dropdown'> 
                        <button
                        className='btn-dropdown btn-block dropdown-toggle d-flex justify-content-between'
                        type='button'
                        id='dropdownMenu1'
                        data-toggle='dropdown'>

                        {/* DEFAULT STATE */}
                        <div className='badge'>
                            <img
                            alt={accDropDownId}
                            className='left mr-2'
                            src={`${`https://admin-pocketlist.herokuapp.com`}/${accDropDownImage}`}
                            style={{ width: "24px" }}
                            />
                            <span>{accDropDownName}</span>
                        </div>
                        </button>
                        <ul className='dropdown-menu ' aria-labelledby='dropdownMenu2' style={{ width: "100%" }}>

                        {/* ACCDROPDOWN = NAMA FETCHNYA. ACCTRANSFER = VAR YG DILEMPAR DI CONTROLLER */}
                           {page.accDropDown.accTransfer.map((acc, _id) => {
                            return (
                            <li
                                key={acc._id}
                                href='/#'
                                className='dropdown-item d-flex justify-content-between'
                                onClick={selectCategory}
                                data-id={acc._id}
                                data-name={acc.accName}
                                data-image={acc.accImageUrl}
                                >
                                <div className='badge'>
                                <img
                                    alt=''
                                    style={{ width: "32px" }}
                                    className='left mr-2'
                                    src={`${`https://admin-pocketlist.herokuapp.com`}/${acc.accImageUrl}`}
                                />
                                <span> {acc.accName} </span>
                                </div>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='form-group row'>
                <label htmlFor='desc' className='col-3 col-form-label'>
                Desc
                </label>
                <div className='col-9'>
                <textarea className='form-control' id='transDesc' name='transDesc' rows='3' value={transDesc} onChange={(e) => setTransDesc(e.target.value)}></textarea>
                </div>
            </div>

            <button type='button' className='btn btn-secondary float-right mb-3' data-dismiss='modal' onClick={(e) => handleOnSubmit(e)}>
                Submit
            </button>
        </form>
      </>
    );
  }

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { fetchPage, addTrans })(TabTransfer);