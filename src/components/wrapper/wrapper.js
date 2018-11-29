import React, { PureComponent } from "react";
import "./wrapper.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActivePage } from "../../actions/actions.js";

class Wrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //this.props.getItems();
  }

  renderActiveChild() {
    return (
      <div className="bcv-page">
        {this.props.children[this.props.active_page]}
      </div>
    );
  }
  renderChildTitles() {
    return this.props.children.map((component, index) => (
      <div
        className={
          index == this.props.active_page
            ? "bcv-wrapper-nav_bar-item_active"
            : "bcv-wrapper-nav_bar-item"
        }
        onClick={() => {
          this.props.setActivePage(index);
        }}
      >
        {this.parseComponentName(component.type.displayName)}
      </div>
    ));
  }
  parseComponentName(str) {
    if (str) return str.substring(8, str.length - 1);
    else return "Noname";
  }

  renderNavBar() {
    return (
      <div className="bcv-wrapper-nav_bar">
        <div className="bcv-wrapper-nav_bar-logo">BCV</div>
        {this.renderChildTitles()}
      </div>
    );
  }

  render() {
    return (
      <div className="bcv-wrapper">
        {this.renderNavBar()}
        {this.renderActiveChild()}
      </div>
    );
  }
}

Wrapper.defaultProps = {
  active_page: 0
};

const mapStateToProps = state => {
  return {
    active_page: state.mainReducer.active_page
  };
};

const mapDispatchToProps = dispatch => ({
  setActivePage: bindActionCreators(setActivePage, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);
