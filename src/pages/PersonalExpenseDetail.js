import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";
import iconBack from "assets/images/icons-operator/Back.svg";
import iconExpenseClear from "assets/images/icons-overview/Expense_Clear.svg";
import { Link } from "react-router-dom";

 class PersonalExpenseDetail extends Component{
    constructor(){
        super();
        this.state={  
        }
    }

    render(){
        // const { page } = this.props; 

        // if (!page.hasOwnProperty("accountDetailPage")) return null;

        // console.log(page)
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
                            <th className="text-center">Operator </th>
                        </tr>
                  
                    </thead>    
                    <tbody>
                        <tr>
                            <td className="text-center">1</td>
                            <td className="text-center">1</td>
                            <td className="text-center">1</td>
                            <td className="text-center">1</td>
                            <td className="text-center">1</td>
                            <td className="text-center">1</td>
                            <td className="text-center">1</td>
                        </tr>
                    </tbody>
                </table>
                  
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    page: state.page,
  });

export default connect(mapStateToProps, { fetchPage })(PersonalExpenseDetail);
