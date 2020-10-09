import React from "react";
import iconDetail from "assets/images/icons-operator/Detail-dark.svg";
import iconSale from "assets/images/icons-overview/Sale.svg";
import iconCost from "assets/images/icons-overview/Cost.svg";
import iconPlus from "assets/images/icons-operator/Plus.svg";

export default function PanelSales() {
  return (
    <div className='col-6 col-md-4 mt-3 no-paddingleft-mob no-paddingleft'>
      <div className='card bg-white text-dark'>
        <div className='card-header'>Business</div>
        <div className='card-body text-center main'>
          <div className='row'>
            <div className='col-md-6 mt-1'>
              <div className='row'>
                <div className='col'>
                  <img src={iconSale} alt='income' />
                </div>
                <div className='col pl-0'>
                  <h6>Revenue</h6>
                  <span>8.000k</span>
                </div>
              </div>
            </div>
            <div className='col-md-6 mt-1'>
              <div className='row'>
                <div className='col'>
                  <img src={iconCost} alt='income' />
                </div>
                <div className='col pl-0'>
                  <h6>Cost</h6>
                  <span>5.000k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer text-right'>
          <a href='/#'>
            <img src={iconPlus} alt='add' />
          </a>
          <a href='/#'>
            <img src={iconDetail} alt='detail' />
          </a>
        </div>
      </div>
    </div>
    // <div className="col-6 col-md-4 pl-md-3 pt-md-2 no-paddingleft-mob">
    //      <div className="panel card">
    //         <div className="panel-header p-2">
    //             <p className="m-0">Sales</p>
    //         </div>
    //             <div className="panel-content-card">
    //                 <div className="row pl-3 pr-4 ">
    //                         <div className="col-6 col-md-3"><img src={iconSale} alt="income"/></div>
    //                         <div className="col-6 col-md-3 no-paddingleft"><span className="text-gray-500">Sale </span>
    //                             <h5>1.500k</h5></div>
    //                         <div className="col-6 col-md-3"><img src={iconCost} alt="expense"/></div>
    //                         <div className="col-6 col-md-3 no-paddingleft"><span className="text-gray-500">Cost </span
    //                             ><h5>1.200k</h5></div>
    //                 </div>
    //             </div>
    //     </div>
    // </div>
  );
}
