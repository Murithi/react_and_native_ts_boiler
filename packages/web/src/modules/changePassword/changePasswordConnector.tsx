import * as React from "react";
import { ChangePasswordController } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

import { ChangePasswordView } from "./ui/ChangePasswordView";

export default class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{
    key: string;
  }>
> {
  onFinish = () => {
    this.props.history.push("/login");
  };
  submit = async (values: any) => {
    console.log(values);
    return null;
  };
  render() {
    console.log(this.props);
    const {
      match: {
        params: { key }
      }
    } = this.props;

    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePasswordView
            onFinish={this.onFinish}
            submit={async ({ newPassword }) => {
              return submit({ key, newPassword });
            }}
          />
        )}
      </ChangePasswordController>
    );
  }
}
