import React from "react";
import { Form } from "./form";

interface ItemProps {
  color: string;
  name: string;
  spinner: JSX.Element;
}

interface ItemState {
  [key: string]: number | string;
}

class LoaderItem extends React.Component<ItemProps, ItemState> {
  constructor(props) {
    super(props);
    let { spinner } = props;
    let defaults = Object.assign({}, spinner.defaultProps);
    delete defaults.color;
    delete defaults.loading;
    delete defaults.sizeUnit;
    delete defaults.widthUnit;
    delete defaults.heightUnit;
    delete defaults.radiusUnit;
    delete defaults.loaderStyle;
    delete defaults.css;

    this.state = {
      ...defaults
    };

    this.update = this.update.bind(this);
  }

  update(field: string) {
    return (e) => {
      let { value } = e.target;
      if (!value.includes("px")) {
        value = parseInt(value, 10);
      }

      this.setState({ [field]: value });
    };
  }

  renderSpinner(Spinner: React.ComponentType<any>) {
    return <Spinner color={this.props.color} {...this.state} />;
  }

  render() {
    let { name, spinner } = this.props;
    return (
      <div>
        <div className="spinner-item">
          <div className="spinner-title">{name}</div>
          {this.renderSpinner(spinner)}
          <Form inputs={this.state} update={this.update} />
        </div>
      </div>
    );
  }
}

export { LoaderItem };