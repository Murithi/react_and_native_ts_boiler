import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { LoginController } from "@abb/controller";
import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <LoginController>
        {({ submit }: { submit: any }) => (
          <LoginView onFinish={this.onFinish} submit={submit} />
        )}
      </LoginController>
    );
  }
}
