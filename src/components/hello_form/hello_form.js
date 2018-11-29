import React, { PureComponent } from "react";
import "./hello_form.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";
import ReCAPTCHA from "react-google-recaptcha";

class HelloForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_log_in: true,
      login_btn_state: false,
      login: "",
      password: "",
      password_confirm: ""
    };
  }
  componentDidMount() {
    //this.props.getItems();
  }

  renderLogInInputBlock() {
    return (
      <div className="bcv-hello_form-form-input_block">
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">Login:</div>
          <input className="bcv-hello_form-form-node_input" />
        </div>
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">Password:</div>
          <input className="bcv-hello_form-form-node_input" type="password" />
        </div>
      </div>
    );
  }

  renderLogInCaptchaBlock() {
    return (
      <div className="bcv-hello_form-form-captcha_block">
        <div className="bcv-hello_form-form-btn_block">
          {!this.state.login_btn_state ? (
            <ReCAPTCHA
              sitekey="6Lcxun0UAAAAAHYKikR75_A0dYupt4gf1yBB0qPn"
              onChange={value => {
                console.log(value);
                setTimeout(() => {
                  this.setState({ login_btn_state: true });
                }, 1000);
              }}
            />
          ) : (
            <div className="bcv-btn">Log In</div>
          )}
        </div>
      </div>
    );
  }
  returnLogInLinkBlock() {
    return (
      <div className="bcv-hello_form-form-not_registered">
        Not registered?{" "}
        <div className="bcv-hello_form-form-not_registered-link">
          Create an account
        </div>
      </div>
    );
  }

  renderLogInBlock() {
    return (
      <div style={{ width: "100%" }}>
        {this.renderLogInInputBlock()}
        {this.renderLogInCaptchaBlock()}
        {this.returnLogInLinkBlock()}
      </div>
    );
  }

  render() {
    return (
      <div className="bcv-hello_form">
        <div className="bcv-wrapper-title">Blockchain Voting</div>
        <div className="bcv-hello_form-form">{this.renderLogInBlock()}</div>
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