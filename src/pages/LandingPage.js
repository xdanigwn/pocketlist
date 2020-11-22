import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "parts/Header";
import Footer from "parts/Footer";
import Balance from "parts/Balance";
import Personal from "parts/Personal";
import Account from "parts/Account";

import { fetchPage } from "store/actions/page";
// import PanelProduct from 'parts/PanelProduct'
// import PanelSales from 'parts/PanelSales'
// import landingPage from "json/landingPage.json"

class LandingPage extends Component {
  // constructor(props) {
  //     super(props);
  //     this.refMostPicked = React.createRef();
  // }

  componentDidMount() {
    if (!this.props.page.landingPage) this.props.fetchPage("landingPage");
  }

  render() {
    const { page } = this.props;
    console.log(page);
    if (!page.hasOwnProperty("landingPage")) return null;

    return (
      <>
        <Header {...this.props}></Header>
        <section>
          <div className='container'>
            <div className='row'>
              <Balance
                refMostPicked={this.refMostPicked}
                data={page.landingPage}></Balance>
              <Personal data={page.landingPage}></Personal>
              <Account data={page.landingPage.account}></Account>
            </div>
          </div>
        </section>
        <Footer {...this.props}></Footer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { fetchPage })(LandingPage);
