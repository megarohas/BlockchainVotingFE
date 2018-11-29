import React, { PureComponent } from "react";
import "./hello_form.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";

class HelloForm extends PureComponent {
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
        <div className="bcv-wrapper-title">Blockchain Voting</div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
        <div>
          <div>piki</div>
          <div>ne piki</div>
        </div>
      </div>
    );
  }
}

HelloForm.defaultProps = {
  //items: []
};
HelloForm.displayName = "HelloForm";

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
)(HelloForm);
