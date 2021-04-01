import React, { Component } from 'react'
import Header from 'parts/Header'

import ExpenseCategory from "parts/ExpenseCategory"
import IncomeCategory from "parts/IncomeCategory"

class ReportPage extends Component {
    
    render() {
        return (
            <>
                <Header {...this.props}></Header>
                <ExpenseCategory></ExpenseCategory>
                <IncomeCategory></IncomeCategory>
            </>
        )
    }
}


export default (ReportPage); // fetchpage dimasukan kedalam page
