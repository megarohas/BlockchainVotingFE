import React, { PureComponent } from "react";
import "./dashboard.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //this.props.getItems();
  }
  render() {
    return (
      <div>
        <div className="bcv-wrapper-title">Dashboard</div>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  //items: []
};
Dashboard.displayName = "Dashbord";

const mapStateToProps = state => {
  return {
    //items: state.mainReducer.items
  };
};

const mapDispatchToProps = dispatch => ({
  //deleteListItem: bindActionCreators(deleteListItem, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
