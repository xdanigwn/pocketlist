import React from "react";

class TabHeader extends React.Component {
  // console.log(this.props)
  render() {
    return (
      <>
        <li className="nav-item">
          {this.props.activeTabs ? (
            <a
              className="nav-link active"
              id={`pills-${this.props.title}-tab`}
              data-toggle="pill"
              href={`#pills-${this.props.title}`}
              role="tab"
              aria-controls={`pills-${this.props.title}`}
              aria-selected="true"
            >
              {this.props.children}
            </a>
          ) : (
            <a
              className="nav-link"
              id={`pills-${this.props.title}-tab`}
              data-toggle="pill"
              href={`#pills-${this.props.title}`}
              role="tab"
              aria-controls={`pills-${this.props.title}`}
              aria-selected="false"
            >
              {this.props.children}
            </a>
          )}
        </li>
      </>
    );
  }
}

class TabContents extends React.Component {
  render() {
    return (
      <>
        {this.props.activeConts ? (
          <div
            className="tab-pane p-3 mt-n3 fade active show"
            id={`pills-${this.props.title}`}
            role="tabpanel"
            aria-labelledby={`pills-${this.props.title}-tab`}
          >
            {this.props.children}
          </div>
        ) : (
          <div
            className="tab-pane p-3 mt-n3 fade"
            id={`pills-${this.props.title}`}
            role="tabpanel"
            aria-labelledby={`pills-${this.props.title}-tab`}
          >
            {this.props.children}
          </div>
        )}
      </>
    );
  }
}

export { TabHeader, TabContents };
