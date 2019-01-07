import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import {
  sendForgotPasswordMailMutation,
  sendForgotPasswordMailMutationVariables
} from "../../schemaTypes";

interface Props {
  children: (
    data: {
      submit: (
        values: sendForgotPasswordMailMutationVariables
      ) => Promise<null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    sendForgotPasswordMailMutation,
    sendForgotPasswordMailMutationVariables
  >
> {
  submit = async (values: sendForgotPasswordMailMutationVariables) => {
    console.log(values);
    const validationResp = await this.props.mutate({
      variables: values
    });
    console.log("response: ", validationResp);
    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation sendForgotPasswordMailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const ForgotPasswordController = graphql<
  Props,
  sendForgotPasswordMailMutation,
  sendForgotPasswordMailMutationVariables
>(forgotPasswordMutation)(C);
