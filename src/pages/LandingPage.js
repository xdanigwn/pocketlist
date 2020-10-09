import React, { Component } from 'react'
import Header from 'parts/Header'
import Footer from 'parts/Footer'
import Balance from 'parts/Balance'
import Personal from 'parts/Personal'
// import PanelProduct from 'parts/PanelProduct'
// import PanelSales from 'parts/PanelSales'
import Account from 'parts/Account'

import landingPage from "json/landingPage.json"

export default class LandingPage extends Component {
    render() {
        return (
            <>
                <Header {...this.props}></Header>
                <section>
                    <div className="container">
                        <div className="row">
                            <Balance data={landingPage.balance}></Balance>
                            <Personal data={landingPage.personal}></Personal>
                            {/* <PanelProduct {...this.props}></PanelProduct>
                            <PanelSales {...this.props}></PanelSales> */}
                            <Account data={landingPage.account}></Account>
                        </div>
                    </div>
                </section>
                <Footer {...this.props}></Footer>
            </>
        )
    }
}
