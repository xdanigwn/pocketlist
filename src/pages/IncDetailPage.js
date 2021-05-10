import React, { useEffect, useContext } from 'react'
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";
import iconBack from "assets/images/icons-operator/Back.svg";
import iconIncomeClear from "assets/images/icons-overview/Income_Clear.svg";
import moment from "moment";
import { Link} from "react-router-dom";

import AuthContext from "context/AuthContext"
import { Redirect } from 'react-router';

function IncDetailPage (props){
    const { fetchPage, match, page} = props

    const { loggedIn, userId }  = useContext(AuthContext)

    useEffect (() => {
        if(userId){
            const refreshDetail = () => fetchPage( `http://localhost:3000/api/v1/personalincdtl/${userId}/${match.params.dateFrom}/${match.params.dateTo}`, "personalIncDtlPage");
            refreshDetail();
        } 
        // console.log(match)
    }, [fetchPage, match, userId]) // dependency = jika  value berubah, maka action di use effect dijalankan

  
    if (!page.hasOwnProperty("personalIncDtlPage")) return null;
    if (loggedIn === false) return Redirect("/") // WHEN COMPONENT MOUNTED, CHECK LOGGED IN
    // console.log(page.personalIncDtlPage)
    
    return(
        <div className="container">
            <div className="my-2">
                <Link to={"/landingpage"}> <img className="border-right mr-2" src={iconBack} alt='Transaction'></img></Link>
                <img width="32px" className="" src={iconIncomeClear} alt='expense' /><span className="border-right pr-2 mt-2 ml-2">Income</span> 
                <i><small>{` Filter : ${moment(props.match.params.dateFrom).format("DD MMM YYYY")} - ${moment(props.match.params.dateTo).format("DD MMM YYYY")}`}</small></i>      
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
                    page.personalIncDtlPage.trans.map((trans,id) =>
                    <tr key={id}>
                        <td className="text-center">{id+1}</td>
                        <td className="text-center"><img alt="" width="32px" src={`${`http://localhost:3000`}/${trans.transAcc.accImageUrl}`}></img></td>
                        <td className="text-center">{moment(trans.transDate).format("DD-MM-YYYY") }</td>
                        <td className="text-center">{trans.transDesc}</td>
                        <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(trans.ammount) )}</td>
                        <td className="text-center"><img alt="" width="32px" src={`${`http://localhost:3000`}/${trans.transCtg.ctgImageUrl}`}></img></td>
                    </tr>
                    )
                    }
                </tbody>
            </table>
                
        </div>
        )
    }

const mapStateToProps = (state) => ({
    page: state.page,
  });

export default connect(mapStateToProps, { fetchPage })(IncDetailPage); // fetchpage dimasukan kedalam page
