import React, {useEffect} from 'react'
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";
import iconBack from "assets/images/icons-operator/Back.svg";
import moment from "moment";
import { Link } from "react-router-dom";
// import { Router } from 'react-router-dom'

 function AccDetailPage(props) {
    const { fetchPage, match, page} = props

    useEffect (() => {
        const refreshDetail = () => {
            fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdtl/${match.params.id_account}`, "accountDetailPage");
        };

        refreshDetail();

        // console.log(props)
    }, [fetchPage, match])

    const handlerDelete = async (e) => {    
        // e.preventDefault();
        props.fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/deltrans/${e.currentTarget.getAttribute("data-id")}`, "DeleteTrans");
        props.fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdtl/${match.params.id_account}`, "accountDetailPage"); props.fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/accountdtl/${match.params.id_account}`, "accountDetailPage");
    }
    
    
    if (!page.hasOwnProperty("accountDetailPage")) return null;

    return(
        <div className="container">
                <div className="my-2">
                    <Link to={"/landingpage"}> <img className="border-right border-light mr-2" src={iconBack} alt='Transaction'></img></Link>
                    {/* MENGAMBIL BALANCE DI MODEL ACCOUNT. DENGAN MENGAMBIL ARRAY KE 0 KARENA CUMA 1 ROW */}
                    { ` ` } <img alt="" width="32px" src={`${`https://admin-pocketlist.herokuapp.com`}/${page.accountDetailPage.trans[0].accountId.accImageUrl}`}/> 
                    { ` ` + page.accountDetailPage.trans[0].accountId.accName + ` - `
                    + ("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(page.accountDetailPage.trans[0].accountId.balance))} 
                </div> 
                <table className="table table-md table-responsive-md table-striped table-bordered table-hover mytable">
                    <thead className="thead-brown">
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Tgl</th>
                            <th>Deskripsi</th>
                            <th className="text-center">Nominal</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Operator </th>
                            <th className="text-center">Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            page.accountDetailPage.trans.map((trans,id) =>
                            <tr key={id}>
                                <td className="text-center">{id+1}</td>
                                <td className="text-center">{moment(trans.transDate).format("DD-MM-YYYY") }</td>
                                <td>{trans.transDesc}</td>
                                <td className="text-center">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(trans.ammount) )}</td>
                                <td className="text-center"><img alt="" width="32px" src={`${`https://admin-pocketlist.herokuapp.com`}/${trans.categoryId.ctgImageUrl}`}></img></td>
                                <td className="text-center">{trans.operator}</td>
                                <th className="text-center">
                                <Link to="#" onClick={handlerDelete} data-id={trans._id} className='btn btn-block btn-white'>
                                    Delete
                                </Link>

                                </th>
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

export default connect(mapStateToProps, { fetchPage })(AccDetailPage);
