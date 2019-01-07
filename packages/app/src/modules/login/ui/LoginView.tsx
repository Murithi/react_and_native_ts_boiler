import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { loginSchema } from "@abb/common";
import { InputField } from "../../shared/inputField";
import { View } from "react-native";
import { Card, Text, Button } from "react-native-elements";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}
export class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Card containerStyle={{ borderColor: "transparent" }}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
          <Field
            name="email"
            placeholder="Email"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />

          <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />

          <Button
            title="submit"
            onPress={handleSubmit as any}
            containerStyle={{ width: "100%", marginTop: 30 }}
          />
        </Card>
      </View>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => {
    return { email: "", password: "" };
  },
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  }
})(C);
