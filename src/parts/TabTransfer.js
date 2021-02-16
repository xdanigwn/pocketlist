import React, { Component } from "react";
import { connect } from "react-redux";
import { addTrans } from "store/actions/addtrans";
import { fetchPage } from "store/actions/page";
import moment from "moment";
import NumberFormat from 'react-number-format'

class TabTransfer extends Component {
  constructor(props) {
    super();
    this.state = {
      // STATE UNTUK PENYIMPANAN / ADDTRANS
      trans: {
        transDate: moment().format("YYYY-MM-DD"),
        transDesc: "",
        ammount: 0,
        operator: "", // DIGENERATE LANGSUNG DI API = (-)
        accountId: "",
        categoryId: "5f76b4626d06cb30700703a6", // OTOMATIS CATEGORY TRANSFER. PADA COMP INI TIDAK ADA PERUBAHAN 
        userId: "5f6f68fc9fd56b291005a357",
        accountIdTo: ""
      },
      // STATE UNTUK DROPDOWN 
      accDropDown : { 
        id : "", // UNTUK MENGISI ACCOUNT TUJUAN
        name : "",
        image :""
      }
    };
    
  }


  componentDidUpdate = (prevProps, prevState) => {
    // STATE DI DESTRUCTURE PADA SAAT COMP DID UPDATE
    const { acc } = this.props;
    const { page } = this.props; 
    const { accDropDown } = this.state; 
    
    // if (prevProps.acc._id !== acc.id){ // AGAR DI SEARCH HANYA SAAT ADA PERUBAHAN ID
      this.props.fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdd/${acc._id}`, "accDropDown" );
    // }
     
    //JALANKAN JIKA STATE MASIH AWAL / KOSONG DAN ACCROPDOWN SUDAH TERISI
    if (accDropDown.name === "" && page.hasOwnProperty("accDropDown")) {
      // console.log(page)
      this.setState({
        trans: { // MENGISI STATE DENGAN 
          ...this.state.trans,
          accountId: acc._id,
          accountIdTo: page.accDropDown.accTransfer[0]._id
        },
        accDropDown: { // MENGISI STATE DENGAN DATA PERTAMA. MUNCUL PADA DROPDOWN
          ...this.state.accDropDown,
          id : page.accDropDown.accTransfer[0]._id,
          name: page.accDropDown.accTransfer[0].accName,
          image: page.accDropDown.accTransfer[0].accImageUrl,
        }
      })
    }
    // console.log(accDropDown)
  };

  handleChange = (e) => {
    // alert(e.target.name);
    this.setState({
      trans: {
        ...this.state.trans,
        [e.target.name]: e.target.value.replace(/,/g,''), //remove comma
      },
    });
    // console.log(this.state.trans.transDate)
  };

  selectCategory = (e) => {
    // JIKA ADA PERUBAHAN DROPDWON

    this.setState({
      ...this.state,
      trans: { // MENGISI STATE DENGAN 
        ...this.state.trans,
        accountIdTo : e.currentTarget.getAttribute("data-id")
      },
      accDropDown: {
        ...this.state.accDropDown,
        id: e.currentTarget.getAttribute("data-id"),
        name: e.currentTarget.getAttribute("data-name"),
        image: e.currentTarget.getAttribute("data-image"),
      },
    });
    // console.log(this.state.accTrf)
  };

  handleOnSubmit = (e) => {
    const { trans } = this.state;

    console.log(trans);
    this.props.addTrans(trans).then(() => {
    // alert("Data Tersimpan!");
      
      document.getElementById("trfFrom").reset();
      this.props.refreshPage();
      this.props.onCancel();
    });
  };

  render() {
    const { acc } = this.props;
    const { page } = this.props; 
    const { accDropDown } = this.state; 

    // console.log(page);

    // JIKA BUKAN PAGE ACC DROPDOWN TIDAK PERLU DIRENDER
    if (!page.hasOwnProperty("accDropDown")) return null;

    return (
      <>
        <form id='trfFrom' method='POST' onSubmit={this.handleOnSubmit}>
            <div className='col-9'>
              <input type='hidden' className='form-control' id='accountId' name='accountId' onChange={this.handleChange} defaultValue={acc._id} />
            </div>
            <div className='form-group row'>
                <label htmlFor='transDate' className='col-3 col-form-label '>
                Date
                </label>
                <div className='col-9'>
                <input type='date' className='form-control' id='transDate' name='transDate' onChange={this.handleChange} value={this.state.trans.transDate} />
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor='ammount' className='col-3 col-form-label '>
                Ammount
                </label>
                <div className='col-9'>
                {/* <input type='number' className='form-control' id='ammount' name='ammount' onChange={this.handleChange} /> */}
                <NumberFormat className='form-control' thousandSeparator={true} id='ammount' name="ammount" onChange={this.handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor='category' className='col-3 col-form-label'>
                to Account
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
                            alt=''
                            className='left mr-2'
                            src={`${`https://admin-pocketlist.herokuapp.com`}/${accDropDown.image}`}
                            style={{ width: "24px" }}
                            />
                            <span>{accDropDown.name}</span>
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
                                onClick={this.selectCategory}
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
                <textarea className='form-control' id='transDesc' name='transDesc' rows='3' onChange={this.handleChange}></textarea>
                </div>
            </div>

            <button type='button' className='btn btn-secondary float-right' data-dismiss='modal' onClick={(e) => this.handleOnSubmit(e)}>
                Submit
            </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { fetchPage, addTrans })(TabTransfer);