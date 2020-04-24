import "./scss/index.scss";

import * as React from "react";
import { useVerifyCode } from "@sdk/react";
import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";

interface IVerifyCodeForm {
  hide?: () => void;
}

const VerifyCodeForm: React.FC<IVerifyCodeForm> = ({ hide }) => {
  const [verifyCode, { loading, error }] = useVerifyCode();

  const handleOnCodeSubmit = async (evt, {smsCode}) => {
    evt.preventDefault();
    const authenticated = await verifyCode({ smsCode, phone: ""});
    if (authenticated && hide) {
        hide();
      }
  }
  return (
    <div className="login-form">
      <Form
        errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={handleOnCodeSubmit}
      >
        <TextField
          name="smsCode"
          autoComplete="smsCode"
          label="Enter Verification Code"
          type="number"
          required
        />
        <div className="login-form__button">
          <Button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Loading" : "Verify"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default VerifyCodeForm;
