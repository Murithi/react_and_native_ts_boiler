import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { ForgotPasswordController } from "@abb/controller";
import { ForgotPasswordView } from "./ui/ForgotPasswordView";

export default class ForgotPasswordConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/reset-password", {
      message: "check your email to reset your password"
    });
  };
  render() {
    return (
      <ForgotPasswordController>
        {({ submit }: { submit: any }) => (
          <ForgotPasswordView submit={submit} onFinish={this.onFinish} />
        )}
      </ForgotPasswordController>
    );
  }
}
