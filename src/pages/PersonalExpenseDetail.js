import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";
import iconBack from "assets/images/icons-operator/Back.svg";
import iconExpenseClear from "assets/images/icons-overview/Expense_Clear.svg";
import moment from "moment";
import { Link } from "react-router-dom";

 class PersonalExpenseDetail extends Component{
    constructor(){
        super();
        this.state={  
        }
    }

    refreshDetail = () => {
        this.props.fetchPage(
            `http://localhost:3000/api/v1/personalexpdtl/5f6f68fc9fd56b291005a357`, "personalExpDtlPage");

    }

    componentDidMount(){
        this.refreshDetail();
        // console.log(page)
    }

    render(){
        const { page } = this.props; 

        if (!page.hasOwnProperty("personalExpDtlPage")) return null;

        console.log(page.personalExpDtlPage)
        return(
            <div className="container">
                <div className="my-2">
                    <Link to={"/"}> <img className="border-right border-light mr-2" src={iconBack} alt='Transaction'></img></Link>
                    <img width="32px" className="" src={iconExpenseClear} alt='expense' /><span className="mt-2 ml-2">Expense</span>    
                </div>

                <table className="table table-md table-responsive-md table-striped table-bordered table-hover mytable mt-2">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Account</th>
                            <th className="text-center">Tgl</th>
                            <th className="text-center">Deskripsi</th>
                            <th className="text-center">Nominal</th>
                            <th className="text-center">Category</th>
                        </tr>
                  
                    </thead>    
                    <tbody>
                        {
                        page.personalExpDtlPage.trans.map((trans,id) =>
                        <tr key={id}>
                            <td className="text-center">{id+1}</td>
                            <td className="text-center"><img alt="" width="32px" src={`${`https://admin-pocketlist.herokuapp.com`}/${trans.transAcc.accImageUrl}`}></img></td>
                            <td className="text-center">{moment(trans.transAcc.transDate).format("DD-MM-YYYY") }</td>
                            <td className="text-center">{trans.transDesc}</td>
                            <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(trans.ammount) )}</td>
                            <td className="text-center"><img alt="" width="32px" src={`${`https://admin-pocketlist.herokuapp.com`}/${trans.transCtg.ctgImageUrl}`}></img></td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
                  
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    page: state.page,
  });

export default connect(mapStateToProps, { fetchPage })(PersonalExpenseDetail); // fetchpage dimasukan kedalam page
