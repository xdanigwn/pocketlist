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
  //     this.state = {
  //       textUpdated : false
  //     }
  // }

  componentDidMount() {
    if (!this.props.page.landingPage)
      this.refreshPage();    
  }

  refreshPage = () => {
    this.props.fetchPage(`http://admin-pocketlist.herokuapp.com:3000/api/v1/overview`, "landingPage");
  }

  render() {
    const { page } = this.props;
    
    if (!page.hasOwnProperty("landingPage")) return null;
    // console.log(page.landingPage.accTransfer);

    // console.log(this.props.page.landingPage.accTransfer);

    return (
      <>
        <Header {...this.props}></Header>
        <section>
          <div className='container'>
            <div className='row'>
              <Balance data={page.landingPage}></Balance>
              <Personal data={page.landingPage}></Personal>
              <Account data= {page.landingPage.account} 
                  datactgInc={page.landingPage.categoryInc} 
                  datactg={page.landingPage.categoryExp} 
                  refreshPage={this.refreshPage}>
              </Account>
              {/* <button type='button' className='btn btn-secondary float-right' data-dismiss='modal' onClick={(e) => this.refreshPage(e)}>
                Refresh
              </button> */}
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
