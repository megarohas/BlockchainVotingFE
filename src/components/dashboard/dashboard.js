import React, { PureComponent } from "react";
import "./dashboard.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";
import DebounceInput from "react-debounce-input";
import CreatePollModal from "../create_poll_modal/create_poll_modal.js";
import ViewPollModal from "../view_poll_modal/view_poll_modal.js";
import { get } from "../../utils/fetcher.js";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      searched_polls: [],
      search_query: "",
      create_poll_modal_state: false,
      view_poll_modal_state: false,
      deleted_polls: [],
      active_poll: { variants: [] }
    };
  }
  componentDidMount() {
    //this.props.getItems();
    get("../../../public/mocks/mock_items.json").then(response => {
      console.log(response);
      this.setState({
        polls: response.polls,
        searched_polls: response.polls,
        active_poll: response.polls[0]
      });
    });
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
              this.setState({ search_query: e.target.value });
            }}
          />
        </div>
      </div>
    );
  }
  renderCheckButton() {
    return (
      <div
        style={{
          marginLeft: "20px",
          width: "150px",
          padding: "5px",
          fontSize: "16px"
        }}
        className="bcv-btn"
      >
        Check All Polls
      </div>
    );
  }
  renderAddPollButton() {
    return (
      <div
        style={{
          marginLeft: "20px",
          width: "150px",
          padding: "5px",
          fontSize: "16px"
        }}
        className="bcv-btn"
        onClick={() => {
          this.setState({ create_poll_modal_state: true });
        }}
      >
        Add New Poll
      </div>
    );
  }
  renderPollTableHeader() {
    return (
      <div className="bcv-dasboard-poll_table-header">
        <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
          Poll ID
        </div>
        <div className="bcv-dasboard-poll-node" style={{ width: "150%" }}>
          Author
        </div>
        <div className="bcv-dasboard-poll-node" style={{ width: "150%" }}>
          Theme
        </div>
        <div className="bcv-dasboard-poll-node">Start Date</div>
        <div className="bcv-dasboard-poll-node">Finish Date</div>
        <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
          Status
        </div>
        <div className="bcv-dasboard-poll-node">Actions</div>
      </div>
    );
  }
  renderPoll(poll) {
    return (
      <div style={{ width: "100%" }}>
        <div className="bcv-dasboard-poll">
          <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
            {poll.id}
          </div>
          <div className="bcv-dasboard-poll-node" style={{ width: "150%" }}>
            {poll.author}
          </div>
          <div className="bcv-dasboard-poll-node" style={{ width: "150%" }}>
            {poll.theme}
          </div>
          <div className="bcv-dasboard-poll-node">{poll.start_date}</div>
          <div className="bcv-dasboard-poll-node">{poll.finish_date}</div>
          <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
            <div className="bcv-dasboard-poll-node-status">
              <div
                className={
                  poll.status
                    ? "bcv-dasboard-poll-node-status-ok"
                    : "bcv-dasboard-poll-node-status-not_ok"
                }
              />
            </div>
          </div>
          <div className="bcv-dasboard-poll-node">
            <div
              style={{ width: "20%", fontSize: "9px", padding: "5px 0px" }}
              className="bcv-btn"
              title="Check Poll"
            >
              <img src="https://icongr.am/clarity/shield-check.svg?size=18&color=ffffff" />
            </div>
            <div style={{ width: "10px", height: "1px" }} />
            <div
              style={{ width: "20%", fontSize: "9px", padding: "5px 0px" }}
              className="bcv-btn"
              title="View Poll"
              onClick={() => {
                this.setState({
                  view_poll_modal_state: true,
                  active_poll: poll
                });
              }}
            >
              <img src="https://icongr.am/clarity/eye.svg?size=18&color=ffffff" />
            </div>
            <div style={{ width: "10px", height: "1px" }} />
            <div
              style={{ width: "20%", fontSize: "9px", padding: "5px 0px" }}
              className="bcv-btn"
              title="Delete Poll"
              onClick={() => {
                this.setState({
                  deleted_polls: [...this.state.deleted_polls, poll.id]
                });
              }}
            >
              <img src="https://icongr.am/clarity/trash.svg?size=18&color=ffffff" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderPolls() {
    return (
      <div className="bcv-dasboard-polls">
        {this.state.polls
          .filter(
            poll =>
              poll.theme
                .toUpperCase()
                .includes(this.state.search_query.toUpperCase()) ||
              poll.author
                .toUpperCase()
                .includes(this.state.search_query.toUpperCase())
          )
          .filter(poll => !this.state.deleted_polls.includes(poll.id))
          .map(poll => this.renderPoll(poll))}
      </div>
    );
  }
  render() {
    return (
      <div className="bcv-page_wrapper">
        {this.state.create_poll_modal_state ? (
          <CreatePollModal
            token="kek"
            closeFunction={() => {
              this.setState({ create_poll_modal_state: false });
            }}
          />
        ) : (
          ""
        )}
        {this.state.view_poll_modal_state ? (
          <ViewPollModal
            token="kek"
            poll={this.state.active_poll}
            closeFunction={() => {
              this.setState({ view_poll_modal_state: false });
            }}
          />
        ) : (
          ""
        )}
        <div className="bcv-dasboard">
          <div className="bcv-dasboard-header_block">
            {this.renderSearchBar()}
            {this.renderCheckButton()}
            {this.renderAddPollButton()}
          </div>
          {this.renderPollTableHeader()}
          {this.renderPolls()}
          <div style={{ width: "1px", height: "50px" }} />
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
