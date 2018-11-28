import React, { PureComponent } from "react";
import "./wrapper.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";

class Wrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //this.props.getItems();
  }

  render() {
    return <div>beba</div>;
  }
}

Wrapper.defaultProps = {
  items: []
};

const mapStateToProps = state => {
  return {
    items: state.mainReducer.items
  };
};

const mapDispatchToProps = dispatch => ({
  //deleteListItem: bindActionCreators(deleteListItem, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);
