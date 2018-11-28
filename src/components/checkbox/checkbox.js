import React, { Component } from "react";
import "./checkbox.scss";

const Checkbox = ({ state, onClick }) => (
  <div className="bcv-checkbox">
    {" "}
    <div
      onClick={() => {
        onClick();
      }}
      className={
        state ? "bcv-checkbox-circle_checked" : "bcv-checkbox-circle_unchecked"
      }
    />{" "}
  </div>
);

export default Checkbox;
