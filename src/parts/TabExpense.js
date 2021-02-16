import React, { Component } from "react";
import { connect } from "react-redux";
import { addTrans } from "store/actions/addtrans";
import moment from "moment";
import NumberFormat from 'react-number-format'

class TabExpense extends Component {
  constructor(props) {
    super();
    this.state = {
      trans: {
        transDate: moment().format("YYYY-MM-DD"),
        transDesc: "",
        ammount: 0,
        operator: "", // DIGENERATE LANGSUNG DI API = (-)
        accountId: "",
        categoryId: "",
        userId: "5f6f68fc9fd56b291005a357",
      },
      ctg : {
        name : "",
        image : ""
      }
    };
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { acc } = this.props;
    const { ctg } = this.props;
    // console.log(acc._id);
    if (prevProps.acc._id !== acc._id) {
      this.setState({
        trans: {
          ...this.state.trans,
          accountId: acc._id,
          categoryId: ctg[0]._id
        },
        ctg: { // mengisi state dari props parent
          name: ctg[0].ctgName,
          image: ctg[0].ctgImageUrl,
          
        },
      });
      // console.log(this.state.trans)
    }
  };

  handleChange = (e) => {
    // alert(e.target.name);
    
      this.setState({
        trans: {
          ...this.state.trans,
          [e.target.name]: e.target.value.replace(/,/g,'') //remove comma
        },
      });
  
    // console.log(this.state.trans);
  };

  selectCategory = (e) => {
    this.setState({
      ...this.state,
      ctg: {
        ...this.state.ctg,
        name: e.currentTarget.getAttribute("data-name"),
        image: e.currentTarget.getAttribute("data-image"),
      },
      trans : {
        ...this.state.trans,
        categoryId : e.currentTarget.getAttribute("data-id"),
      }
    });

    // console.log(this.state.trans)

  };

  handleOnSubmit = (e) => {
    const { trans } = this.state;
    // console.log(trans);
    this.props.addTrans(trans).then(() => {
      // alert("Data Tersimpan!");
      
      document.getElementById("Expform").reset();
      this.props.refreshPage();
      this.props.onCancel();
    });
  };

  render() {
    const { acc } = this.props;
    const { ctg } = this.state;

    return (
      <>
        <form id='Expform' method='POST' onSubmit={this.handleOnSubmit}>
            <div className='col-9'>
            <input type='hidden' className='form-control' id='accountId' name='accountId' onChange={this.handleChange} defaultValue={acc._id} />
            </div>
        <div className='form-group row'>
            <label htmlFor='transDate' className='col-3 col-form-label '>
            Date
            </label>
            <div className='col-9'>
            {/* {this.state.trans.transDate} */}
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
            Category
            </label>
            <div className='col-9'>
                {/* DROPDOWN CATEGORY */}
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
                        src={`${`https://admin-pocketlist.herokuapp.com`}/${ctg.image}`}
                        style={{ width: "24px" }}
                        />
                        <span>{ctg.name}</span>
                    </div>
                    </button>
                    <ul className='dropdown-menu ' aria-labelledby='dropdownMenu2' style={{ width: "100%" }}>
                    {this.props.ctg.map((ctg, _id) => {
                        return (
                        <li
                            key={ctg._id}
                            href='/#'
                            className='dropdown-item d-flex justify-content-between'
                            onClick={this.selectCategory}
                            data-id={ctg._id}
                            data-name={ctg.ctgName}
                            data-image={ctg.ctgImageUrl}
                            >
                            <div className='badge'>
                            <img
                                alt=''
                                style={{ width: "32px" }}
                                className='left mr-2'
                                src={`${`https://admin-pocketlist.herokuapp.com`}/${ctg.ctgImageUrl}`}
                            />
                            <span> {ctg.ctgName} </span>
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

export default connect(null, { addTrans })(TabExpense);
