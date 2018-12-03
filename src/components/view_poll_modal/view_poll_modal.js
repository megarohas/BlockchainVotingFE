import React, { PureComponent } from "react";
import "./view_poll_modal.scss";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default class ViewPollModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active_variant: -1
    };
  }

  renderVariant(variant, index) {
    let style = { border: "2px solid rgba(91, 182, 115,0)" };
    let btn_style = {};
    if (variant.id == this.state.active_variant) {
      style = {
        backgroundColor: "rgb(91, 182, 115)",
        color: "white",
        border: "2px solid rgb(91, 182, 115)"
        // color: "rgb(91, 182, 115)",
        // border: "2px solid rgb(91, 182, 115)"
      };
      btn_style = {
        backgroundColor: "rgb(91, 182, 115)",
        borderColor: "rgb(91, 182, 115)"
      };
    }
    let action = (
      <div
        style={{
          ...btn_style,
          width: "15%",
          fontSize: "9px",
          padding: "5px 0px",
          marginLeft: "4px"
        }}
        className="bcv-btn"
        title="Vote"
        onClick={() => {
          this.setState({
            active_variant: variant.id
          });
        }}
      >
        <img
          src={
            variant.id == this.state.active_variant
              ? ""
              : "https://icongr.am/clarity/thumbs-up.svg?size=25&color=ffffff"
          }
        />
      </div>
    );

    return (
      <div
        className="bcv-hello_form-form-input_block-node"
        style={{ marginBottom: "0px", height: "45px" }}
      >
        <div
          className="bcv-day_picker_input-wrapper"
          style={{ ...style, marginRight: "0px", padding: "2px 10px" }}
        >
          {variant.title}{" "}
          {this.props.poll.completed ? (
            <div className="bcv-view_poll_modal-percent_value">
              {this.props.poll.variants[index].percent_value}
            </div>
          ) : (
            action
          )}
        </div>
      </div>
    );
  }

  renderVariants() {
    return this.props.poll.variants.map((variant, index) =>
      this.renderVariant(variant, index)
    );
  }

  renderAdditionalBlock() {
    return (
      <div>
        {
          <div
            className="bcv-create_poll_modal-title"
            style={{ width: "calc(100% - 20px)", marginLeft: "20px" }}
          >
            Make Your Choice
          </div>
        }
        <div className="bcv-view_poll_modal-additional_block">
          {this.renderVariants()}
        </div>
      </div>
    );
  }
  renderThemeField() {
    return (
      <div className="bcv-hello_form-form-input_block-node">
        <div className="bcv-hello_form-form-node_title">Theme:</div>
        <input
          className="bcv-hello_form-form-node_input"
          value={this.state.theme}
          onChange={e => {
            this.setState({ theme: e.target.value });
          }}
        />
      </div>
    );
  }
  renderField(title, value) {
    return (
      <div
        className="bcv-hello_form-form-input_block-node"
        style={{ alignItems: "flex-start" }}
      >
        <div className="bcv-hello_form-form-node_title">{title}</div>
        <div
          className="bcv-day_picker_input-wrapper"
          style={{
            marginRight: "0px",
            maxHeight: "80px",
            overflow: "scroll",
            alignItems: "flex-start"
          }}
        >
          {value}
        </div>
      </div>
    );
  }

  renderTr() {
    return (
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "black"
          //marginBottom: "20px"
          //  marginTop: "20px"
        }}
      />
    );
  }
  render() {
    return (
      <div
        className="bcv-hello_form"
        style={{
          zIndex: "999",
          backgroundColor: "rgba(1,0,0,0.4)"
          //filter: "blur(5px)"
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <div className="bcv-create_poll_modal-title">
              Poll #{this.props.poll.id}
            </div>
            <div className="bcv-hello_form-form" style={{ margin: "0px" }}>
              {this.renderField("Theme:", this.props.poll.theme)}
              {this.renderField("Start Date:", this.props.poll.start_date)}
              {this.renderField("Finish Date:", this.props.poll.finish_date)}
              {this.renderField("Description:", this.props.poll.description)}

              <div
                className="bcv-create_poll_modal-btn_block"
                style={{ marginTop: "20px" }}
              >
                {this.state.active_variant != -1 ? (
                  <div
                    className="bcv-btn"
                    onClick={() => {
                      this.props.closeFunction();
                    }}
                  >
                    Vote
                  </div>
                ) : (
                  ""
                )}
                <div style={{ width: "22px", height: "1px" }} />
                <div
                  className="bcv-btn"
                  onClick={() => {
                    this.props.closeFunction();
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </div>
          {this.renderAdditionalBlock()}
        </div>
      </div>
    );
  }
}

ViewPollModal.defaultProps = {
  poll: { variants: [] }
};
