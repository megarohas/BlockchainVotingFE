import React, { PureComponent } from "react";
import "./dashboard.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";
import DebounceInput from "react-debounce-input";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //this.props.getItems();
  }

  renderSearchBar() {
    return (
      <div className="bcv-dasboard-searchbar">
        <div className="bcv-dasboard-searchbar_border">
          <img
            className="bcv-dasboard-searchbar-ico"
            src="https://icongr.am/fontawesome/search.svg?color=000000&size=18"
          />
          <DebounceInput
            value={this.state.search_str}
            className="fb3-page_information-simple_input"
            placeholder="Search"
            type="text"
            minLength={2}
            debounceTimeout={300}
            onChange={e => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
  renderCheckButton() {
    return (
      <div style={{ marginLeft: "20px", width: "200px" }} className="bcv-btn">
        Check All Polls
      </div>
    );
  }
  renderPolls() {
    return (
      <div style={{ width: "100%" }}>
        <div className="bcv-dasboard-poll">
          <div className="bcv-dasboard-poll-node">1</div>
          <div className="bcv-dasboard-poll-node">Author</div>
          <div className="bcv-dasboard-poll-node">11.11.29</div>
          <div className="bcv-dasboard-poll-node">11.12.29</div>
          <div className="bcv-dasboard-poll-node">OK</div>
          <div className="bcv-dasboard-poll-node">ACTION</div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="bcv-page_wrapper">
        <div className="bcv-dasboard">
          <div style={{ display: "flex", width: "100%" }}>
            {this.renderSearchBar()}
            {this.renderCheckButton()}
          </div>
          {this.renderPolls()}
        </div>
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
