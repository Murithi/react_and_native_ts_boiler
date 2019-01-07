import * as React from "react";
import { graphql, ChildMutateProps, FetchResult } from "react-apollo";
import gql from "graphql-tag";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/normalizedErrorMap";
interface Props {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    console.log(values);
    const validationResp = this.props
      .mutate({
        variables: values
      })
      .then((response: FetchResult) => {
        console.log("response: ", response);
        if (response.data && response.data.hasOwnProperty("register")) {
          const { data: { register } = response } = response;
          if (register) {
            return normalizeErrors(register);
          } else {
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

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
