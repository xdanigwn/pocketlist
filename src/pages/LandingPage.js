import React, { useEffect, useCallback,
  useContext, useState
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
    const [didMount, setDidMount] = useState(false);  // TO PREVENT COMPONENT RENDER BEFORE FILL THE PROPS PAGE
    const { page, fetchPage} = props;
    const { userId, name }  = useContext(AuthContext)
    // const history = useHistory();
   
    const refreshPage = useCallback(
      (dateFrom, dateTo) => {
        // console.log(userId)
        // if(!didMount){
          fetchPage(`https://admin-pocketlist.herokuapp.com/api/v1/overview/${userId}/${dateFrom}/${dateTo}`, "landingPage");
        // }
        
      },
      [ fetchPage, 
        userId,
        // didMount
      ],
    );

    useEffect ( () => {
      // alert(loggedIn);   

      if(userId){
          console.log(name);
          refreshPage(moment().startOf("month").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));  // SET FIRST LOAD WITH FIRST DATE OF MONTH - NOW DATE
          setDidMount(true);
      }
      
      return () => setDidMount(false);

    }, [refreshPage, userId,didMount])

    // console.log(userId);
    if (userId === undefined) return Redirect("/")
    if (!userId || !didMount || !page.hasOwnProperty("landingPage") ) { return null  };

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
    )
  }

const mapStateToProps = (state) => ({
  page: state.page,
});

  
export default connect(mapStateToProps, { fetchPage })(LandingPage);