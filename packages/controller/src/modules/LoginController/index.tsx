import * as React from "react";
import { graphql, ChildMutateProps, FetchResult } from "react-apollo";
import gql from "graphql-tag";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/normalizedErrorMap";

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (
    data: {
      submit: (
        values: LoginMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    console.log(values);
    const validationResp = this.props
      .mutate({
        variables: values
      })
      .then((response: FetchResult) => {
        console.log(response);
        if (response.data && response.data.hasOwnProperty("login")) {
          const {
            data: {
              login: { sessionId, errors }
            }
          } = response;
          if (sessionId) {
            if (sessionId && this.props.onSessionId) {
              this.props.onSessionId(sessionId);
            }
            return null;
          } else {
            if (errors) {
              return normalizeErrors(errors);
            }
            return null;
          }
        } else {
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        return null;
      });

    return validationResp;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(C);
