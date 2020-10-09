import React from "react";
import iconProduct from "assets/images/icons-overview/Product.svg";
import iconDetail from "assets/images/icons-operator/Detail-dark.svg";
import iconPlus from "assets/images/icons-operator/Plus.svg";

export default function PanelProduct() {
  return (
    <div className="col-6 col-md-2 mt-3 no-paddingleft">
      <div className="card bg-white text-dark">
        <div className="card-header">Product</div>
        <div className="card-body text-center align-items-center main">
          <div className="row">
            <div className="col mt-4 mt-md-0">
              <div className="row">
                <div className="col">
                  <img src={iconProduct} alt="income" />
                </div>
                <div className="col pl-0">
                  <h6>Worth</h6>
                  <span>1.000k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-right">
          <a href="/#">
            <img src={iconPlus} alt="add" />
          </a>
          <a href="/#">
            <img src={iconDetail} alt="detail" />
          </a>
        </div>
      </div>
    </div>
  );
}
