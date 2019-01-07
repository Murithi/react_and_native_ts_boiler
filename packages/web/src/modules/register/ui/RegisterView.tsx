import React, { PureComponent } from "react";
import { Form as AntForm, Icon, Button } from "antd";

import { withFormik, FormikProps, Field, Form } from "formik";
import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/inputField";
import { Link } from "react-router-dom";
import { NormalizedErrorMap } from "@abb/controller";

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}
export class C extends PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />

          <Field
            name="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            component={InputField}
          />

          <FormItem>
            <Link to="/forgot-password">Forgot password</Link>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </FormItem>
          <FormItem>
            Or <Link to="login">Login now!</Link>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => {
    return { email: "", password: "" };
  },
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);

    if (!errors) {
      props.onFinish();
    } else {
      setErrors(errors);
    }
  }
})(C);
