import React, { PureComponent } from "react";
import "./create_poll_modal.scss";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      variants: [{ value: "" }],
      theme: "",
      start_date: "",
      finish_date: "",
      description: ""
    };
  }

  renderVariants() {
    return this.state.variants.map((variant, index) => {
      let action = (
        <div
          style={{
            width: "20%",
            fontSize: "9px",
            padding: "0px 0px",
            marginLeft: "3px"
          }}
          className="bcv-btn"
          title="Add Variant"
          onClick={() => {
            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            //let objDiv = document.getElementById("bcv-cpm-vsb");
            //console.log("objDiv.scrollHeight", objDiv.scrollHeight);
            //objDiv.scrollTop = objDiv.scrollHeight + 500;
            //objDiv.scrollTop = 0;
            this.setState({
              variants: [...this.state.variants, { value: "" }]
            });
          }}
        >
          <img src="https://icongr.am/clarity/plus.svg?size=25&color=ffffff" />
        </div>
      );
      if (index != this.state.variants.length - 1)
        action = (
          <div
            style={{
              width: "20%",
              fontSize: "9px",
              padding: "0px 0px",
              marginLeft: "4px"
            }}
            className="bcv-btn"
            title="Add Variant"
            onClick={() => {
              this.setState({
                variants: [...this.state.variants].filter(
                  (variant, variant_index) => variant_index !== index
                )
              });
            }}
          >
            <img src="https://icongr.am/clarity/minus.svg?size=25&color=ffffff" />
          </div>
        );
      return (
        <div className="bcv-hello_form-form-input_block-node">
          <div className="bcv-hello_form-form-node_title">
            Variant {index + 1}:
          </div>
          <input
            value={this.state.variants[index].value}
            className="bcv-hello_form-form-node_input"
            style={{ width: "calc(100% - 102px)" }}
            onChange={e => {
              this.setState({
                variants: this.state.variants.map((item, item_index) => {
                  if (index == item_index)
                    return { ...item, value: e.target.value };
                  else return item;
                })
              });
            }}
          />
          {action}
        </div>
      );
    });
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
  renderStartDateField() {
    return (
      <div className="bcv-hello_form-form-input_block-node">
        <div className="bcv-hello_form-form-node_title">Start Date:</div>
        <div className="bcv-day_picker_input-wrapper">
          <DayPickerInput
            onDayChange={day => this.setState({ start_date: day })}
          />
        </div>
      </div>
    );
  }
  renderFinishDateField() {
    return (
      <div className="bcv-hello_form-form-input_block-node">
        <div className="bcv-hello_form-form-node_title">Finish Date:</div>
        <div className="bcv-day_picker_input-wrapper">
          <DayPickerInput
            onDayChange={day => this.setState({ finish_date: day })}
          />
        </div>
      </div>
    );
  }
  renderDescriptionDateField() {
    return (
      <div className="bcv-hello_form-form-input_block-node">
        <div className="bcv-hello_form-form-node_title">Description:</div>
        <textarea
          className="bcv-hello_form-form-node_input"
          style={{ height: "100px" }}
          value={this.state.description}
          onChange={e => {
            this.setState({ description: e.target.value });
          }}
        />
      </div>
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
        <div className="bcv-create_poll_modal-title">New Poll</div>
        <div className="bcv-hello_form-form" style={{ marginTop: "0px" }}>
          {this.renderThemeField()}
          {this.renderStartDateField()}
          {this.renderFinishDateField()}
          {this.renderDescriptionDateField()}
          <div
            id="bcv-cpm-vsb"
            style={{
              width: "100%",
              maxHeight: "200px",
              overflow: "scroll"
            }}
          >
            {this.renderVariants()}
          </div>
          <div style={{ width: "3px", height: "20px" }} />
          <div className="bcv-create_poll_modal-btn_block">
            <div
              className="bcv-btn"
              onClick={() => {
                this.props.closeFunction();
              }}
            >
              Cancel
            </div>
            <div style={{ width: "3px", height: "1px" }} />
            <div
              className="bcv-btn"
              onClick={() => {
                this.props.closeFunction();
              }}
            >
              Create
            </div>
          </div>
        </div>
      </div>
    );
  }
}
