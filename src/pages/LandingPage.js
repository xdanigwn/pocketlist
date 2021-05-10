import React, { useEffect, useCallback,
  useContext 
} from "react";
import { connect } from "react-redux";
import Header from "parts/Header";
import Footer from "parts/Footer";
import Balance from "parts/Balance";
import Personal from "parts/Personal";
import Account from "parts/Account";
import moment from "moment";

import AuthContext from "context/AuthContext"
import { Redirect } from 'react-router';

import { fetchPage } from "store/actions/page";
// import PanelProduct from 'parts/PanelProduct'
// import PanelSales from 'parts/PanelSales'
// import landingPage from "json/landingPage.json"

function LandingPage(props) {
    const { page, fetchPage} = props;
    // const x = 1234

    const { loggedIn, userId }  = useContext(AuthContext)
    
    const refreshPage = useCallback(
      (dateFrom, dateTo) => {
        // console.log(userId)
        fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/overview/${userId}/${dateFrom}/${dateTo}`, "landingPage");
      },
      [fetchPage, 
        userId
      ],
    );

    useEffect (() => {
      // alert(loggedIn);
      // console.log(x)
      if(userId){
        refreshPage(moment().startOf("month").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));  // SET FIRST LOAD WITH FIRST DATE OF MONTH - NOW DATE
      }
      // return () => {
      //   alert(loggedIn)
      // }
      
    // }, [refreshPage])

  }, [refreshPage, 
    userId
  ])
  // console.log(page)
    if (!page.hasOwnProperty("landingPage")) return null;
    if (loggedIn === false) return Redirect("/") // WHEN COMPONENT MOUNTED, CHECK LOGGED IN
    // console.log(page.landingPage.accTransfer)

    return (
      <>
        <Header {...props}></Header>
        <section>
          <div className='container'>
            <div className='row'>
              <Balance data={page.landingPage}></Balance>
              <Personal data={page.landingPage}
                  refreshPage={refreshPage}
              ></Personal>
              <Account data= {page.landingPage.account} 
                  datactgInc={page.landingPage.categoryInc} 
                  datactg={page.landingPage.categoryExp} 
                  refreshPage={refreshPage}>
              </Account>
              {/* <button type='button' className='btn btn-secondary float-right' data-dismiss='modal' onClick={(e) => this.refreshPage(e)}>
                Refresh
              </button> */}
            </div>
          </div>
        </section>
        <Footer {...props}></Footer>
      </>
    );
  }

const mapStateToProps = (state) => ({
  page: state.page,
});

  
export default connect(mapStateToProps, { fetchPage })(LandingPage);