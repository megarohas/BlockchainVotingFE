import React, { PureComponent } from "react";
import "./dashboard.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";
import DebounceInput from "react-debounce-input";
import CreatePollModal from "../create_poll_modal/create_poll_modal.js";
import ViewPollModal from "../view_poll_modal/view_poll_modal.js";
import { get } from "../../utils/fetcher.js";
import { setField } from "../../actions/actions.js";
import axios from 'axios';

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
      active_poll: { variants: [] },
      is_admin: false
    };
  }
  componentDidMount() {
    //this.props.getItems();
    // get("../../../public/mocks/mock_items.json").then(response => {
    //   console.log(response);
    //   this.setState({
    //     polls: response.polls,
    //     searched_polls: response.polls,
    //     active_poll: response.polls[0],
    //     is_admin: true
    //   });
    // });
    axios.get('http://localhost:3001/polls/')
      .then(response => {
        response.data.forEach(poll => {
          poll.start_date = this.formatDate(new Date(poll.created_at));
          if (poll.ends_at)
            poll.finish_date = this.formatDate(new Date(poll.ends_at).toString());
          poll.completed = poll.ends_at && (new Date(poll.ends_at) > new Date(poll.created_at))
        });
        return response;
      })
      .then(response => {
        response.data.forEach(poll => {
          axios.get(`http://localhost:3001/users/${poll.id}`)
            .then(response => {
              poll.author = response.data.email;
            });
        });
        return response;
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            polls: response.data,
            searched_polls: response.data,
            active_poll: response.data[0],
            is_admin: true
          });
        }, 1000);
      });
  }

  formatDate(date) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  renderSearchBar() {
    return (
      <div
        className="bcv-dasboard-searchbar"
        style={this.state.is_admin ? {} : { width: "100%" }}
      >
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
        {this.state.is_admin ? (
          <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
            Status
          </div>
        ) : (
          ""
        )}
        <div className="bcv-dasboard-poll-node">Actions</div>
      </div>
    );
  }
  renderPoll(poll) {
    return (
      <div key={poll.id} style={{ width: "100%" }}>
        <div className="bcv-dasboard-poll">
          {poll.completed ? (
            <div className="bcv-dasboard-poll-node-completed">COMPLETED</div>
          ) : (
            ""
          )}
          <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
            {poll.id}
          </div>
          <div className="bcv-dasboard-poll-node" style={{ width: "150%" }}>
            {poll.author}
          </div>
          <div className="bcv-dasboard-poll-node" style={{ width: "150%" }}>
            {poll.theme}
          </div>
          <div className="bcv-dasboard-poll-node">{poll.start_date || 'N/A'}</div>
          <div className="bcv-dasboard-poll-node">{poll.finish_date || 'N/A'}</div>
          {this.state.is_admin ? (
            <div className="bcv-dasboard-poll-node" style={{ width: "50%" }}>
              <div className="bcv-dasboard-poll-node-status">
                <div
                  className={
                    poll.valid
                      ? "bcv-dasboard-poll-node-status-ok"
                      : "bcv-dasboard-poll-node-status-not_ok"
                  }
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="bcv-dasboard-poll-node">
            {this.state.is_admin ? (
              <div
                style={{ width: "20%", fontSize: "9px", padding: "5px 0px" }}
                className="bcv-btn"
                title="Check Poll"
              >
                <img src="https://icongr.am/clarity/shield-check.svg?size=18&color=ffffff" />
              </div>
            ) : (
              ""
            )}
            {this.state.is_admin ? (
              <div style={{ width: "10px", height: "1px" }} />
            ) : (
              ""
            )}
            {poll.valid ? (
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
            ) : (
              ""
            )}
            {poll.valid ? (
              <div style={{ width: "10px", height: "1px" }} />
            ) : (
              ""
            )}
            {this.state.is_admin ? (
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
            ) : (
              ""
            )}
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
            is_admin={this.state.is_admin}
            poll={this.state.active_poll}
            closeFunction={() => {
              this.setState({ view_poll_modal_state: false });
            }}
            onVote={id => {
              axios.post(`http://localhost:3001/polls/${this.state.active_poll.id}/options/${id}/votes`);
            }}
          />
        ) : (
          ""
        )}
        <div className="bcv-dasboard">
          <div className="bcv-dasboard-header_block">
            {this.renderSearchBar()}
            {this.state.is_admin ? this.renderCheckButton() : ""}
            {this.state.is_admin ? this.renderAddPollButton() : ""}
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
  setField: bindActionCreators(setField, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
