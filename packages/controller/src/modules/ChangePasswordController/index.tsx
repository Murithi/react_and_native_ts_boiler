import * as React from "react";
import { graphql, ChildMutateProps, FetchResult } from "react-apollo";
import gql from "graphql-tag";
import {
  forgotPasswordChangeMutation,
  forgotPasswordChangeMutationVariables
} from "../../schemaTypes";
import { error } from "util";

import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/normalizedErrorMap";

interface Props {
  children: (
    data: {
      submit: (
        values: forgotPasswordChangeMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    forgotPasswordChangeMutation,
    forgotPasswordChangeMutationVariables
  >
> {
  submit = async (values: forgotPasswordChangeMutationVariables) => {
    console.log(values);
    const validationResp = this.props
      .mutate({
        variables: values
      })
      .then((response: FetchResult) => {
        if (
          response.data &&
          response.data.hasOwnProperty("forgotPasswordChange")
        ) {
          const {
            data: { forgotPasswordChange }
          } = response;
          console.log(forgotPasswordChange);
          if (forgotPasswordChange) {
            return normalizeErrors(forgotPasswordChange);
          }
        }
        return null;
      })
      .catch(error);
    console.log("response: ", validationResp);
    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

const changeForgotPasswordMutation = gql`
  mutation forgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

export const ChangePasswordController = graphql<
  Props,
  forgotPasswordChangeMutation,
  forgotPasswordChangeMutationVariables
>(changeForgotPasswordMutation)(C);
