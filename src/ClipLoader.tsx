/** @jsx jsx */
import React from "react";
import { keyframes, css, jsx } from "@emotion/core";
import onlyUpdateForKeys from "recompose/onlyUpdateForKeys";
import { sizeDefaults, sizeKeys } from "./helpers/proptypes";
import { Keyframes } from "@emotion/serialize";
import { StyleFunction, PrecompiledCss, LoaderSizeProps } from "./interfaces";

// This returns an animation
const clip: Keyframes = keyframes`
  0% {transform: rotate(0deg) scale(1)} 
  50% {transform: rotate(180deg) scale(0.8)}
  100% {transform: rotate(360deg) scale(1)}
`;

class Loader extends React.PureComponent<LoaderSizeProps> {
  static defaultProps: LoaderSizeProps = sizeDefaults(35);

  style: StyleFunction = (): PrecompiledCss => {
    const { size, sizeUnit, color } = this.props;

    return css`
      background: transparent !important;
      width: ${`${size}${sizeUnit}`};
      height: ${`${size}${sizeUnit}`};
      border-radius: 100%;
      border: 2px solid;
      border-color: ${color};
      border-bottom-color: transparent;
      display: inline-block;
      animation: ${clip} 0.75s 0s infinite linear;
      animation-fill-mode: both;
    `;
  };

  render(): JSX.Element | null {
    const { loading, css } = this.props;
    return loading ? <div css={[this.style(), css]} /> : null;
  }
}

const Component = onlyUpdateForKeys(sizeKeys)(Loader);
Component.defaultProps = Loader.defaultProps;
export default Component;