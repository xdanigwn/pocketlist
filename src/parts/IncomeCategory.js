import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";

class IncomeCategory extends Component {
    refreshDetail = () => {
        this.props.fetchPage(
            `http://localhost:3000/api/v1/reportincctg/5f6f68fc9fd56b291005a357`, "reportIncomeCategory");

    }
    componentDidMount(){
        this.refreshDetail();
        // console.log(page)
    }
    render() {
        const { page } = this.props; 
       
        if (!page.hasOwnProperty("reportIncomeCategory")) return null;

        console.log(page.reportIncomeCategory)
        
        const totalIncome = page.reportIncomeCategory.transinc.reduce((transinc, x) => transinc + x.total, 0) // menghitung total didalam array dengan menggunakan fungsi reduce

        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className="card shadow my-3 mx-3" style={{width:"100%"}}>
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Rekap Income Percategory</h6>
                            </div>
                            <div className="card-body py-3">
                            {
                            
                            page.reportIncomeCategory.transinc.map((transinc,id) =>
                               
                                <div key={id}>

                                    <h4 className="small font-weight-bold">{transinc._id} <span className="float-right">{("Rp. " + Intl.NumberFormat("en-US", { style: "decimal" }).format(transinc.total) )}</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{width: parseInt(`${transinc.total}`) / parseInt(`${totalIncome}%`) * 100+"%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                )
                            }

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    page: state.page,
  });

export default connect(mapStateToProps, { fetchPage })(IncomeCategory); // fetchpage dimasukan kedalam page
