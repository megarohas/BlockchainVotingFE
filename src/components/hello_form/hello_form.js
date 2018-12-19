import React, { PureComponent } from "react";
import "./hello_form.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteListItem } from "../../actions/actions.js";
import ReCAPTCHA from "react-google-recaptcha";
import { setField } from "../../actions/actions.js";

class HelloForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_log_in: true,
      login_btn_state: true,
      reg_btn_state: false,
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
          <div className="bcv-hello_form-form-node_title">Email:</div>
          <input className="bcv-hello_form-form-node_input" />
        </div>
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">Password:</div>
          <input className="bcv-hello_form-form-node_input" type="password" />
        </div>
      </div>
    );
  }
  renderRegInputBlock() {
    return (
      <div className="bcv-hello_form-form-input_block">
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">Email:</div>
          <input className="bcv-hello_form-form-node_input" />
        </div>
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">Password:</div>
          <input className="bcv-hello_form-form-node_input" type="password" />
        </div>
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">
            Confirm Password:
          </div>
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
            <div
              className="bcv-btn"
              onClick={() => {
                this.props.setField("active_page", 1);
              }}
            >
              Log In
            </div>
          )}
        </div>
      </div>
    );
  }
  renderRegCaptchaBlock() {
    return (
      <div className="bcv-hello_form-form-captcha_block">
        <div className="bcv-hello_form-form-btn_block">
          {!this.state.reg_btn_state ? (
            <ReCAPTCHA
              sitekey="6Lcxun0UAAAAAHYKikR75_A0dYupt4gf1yBB0qPn"
              onChange={value => {
                console.log(value);
                setTimeout(() => {
                  this.setState({ reg_btn_state: true });
                }, 1000);
              }}
            />
          ) : (
            <div
              className="bcv-btn"
              onClick={() => {
                this.props.setField("active_page", 1);
              }}
            >
              Register
            </div>
          )}
        </div>
      </div>
    );
  }
  returnLogInLinkBlock() {
    return (
      <div className="bcv-hello_form-form-not_registered">
        Not registered?{" "}
        <div
          className="bcv-hello_form-form-not_registered-link"
          onClick={() => {
            this.setState({
              is_log_in: false,
              reg_btn_state: false,
              login_btn_state: false
            });
          }}
        >
          Create an account
        </div>
      </div>
    );
  }
  returnRegLinkBlock() {
    return (
      <div className="bcv-hello_form-form-not_registered">
        Registered?{" "}
        <div
          className="bcv-hello_form-form-not_registered-link"
          onClick={() => {
            this.setState({
              is_log_in: true,
              reg_btn_state: false,
              login_btn_state: false
            });
          }}
        >
          LogIn
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
  renderRegBlock() {
    return (
      <div style={{ width: "100%" }}>
        {this.renderRegInputBlock()}
        {this.renderRegCaptchaBlock()}
        {this.returnRegLinkBlock()}
      </div>
    );
  }

  render() {
    return (
      <div className="bcv-hello_form">
        <div className="bcv-wrapper-title">Blockchain Voting</div>
        <div className="bcv-hello_form-form">
          {this.state.is_log_in
            ? this.renderLogInBlock()
            : this.renderRegBlock()}
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
  setField: bindActionCreators(setField, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloForm);
