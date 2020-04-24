import "./scss/index.scss";

import React,{ useState } from "react";
import { useVerifyCode } from "@sdk/react";

import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { TypedAccountRegisterMutation } from "./queries";
import { RegisterAccount } from "./types/RegisterAccount";

import { AlertManager, useAlert } from "react-alert";
import { accountConfirmUrl } from "../../../app/routes";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager
) => {
  maybe(() => !data.accountRegister.errors.length);
  // if (successful) {
  //   hide();
  //   alert.show(
  //     {
  //       title: data.accountRegister.requiresConfirmation
  //         ? "Please check your e-mail for further instructions"
  //         : "New user has been created",
  //     },
  //     { type: "success", timeout: 5000 }
  //   );
  // }
};

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const [message, setMessage] = useState(true);
  const [phone, setPhone] = useState("");
  const [verifyCode, { loading, error }] = useVerifyCode();
  
  const handleOnCodeSubmit = async (evt, {smsCode}) => {
    evt.preventDefault();
    const authenticated = await verifyCode({ smsCode,phone });
    if (authenticated && hide) {
      hide();
      alert.show(
            {
              title: "New user has been created",
            },
            { type: "success", timeout: 5000 }
          );
    }
  }
  return (
    <>
    {!message ?
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
    :
    <TypedAccountRegisterMutation
      onCompleted={data => showSuccessNotification(data, hide, alert)}
    >
      {(registerCustomer, { loading, data }) => {
        if(data && data.accountRegister.errors.length === 0){
          setMessage(false)
          setPhone(data.accountRegister.user.phone)
        }
        return (
          <Form
            errors={maybe(() => data.accountRegister.errors, [])}
            onSubmit={(event, { phone, password }) => {
              event.preventDefault();
              const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
              registerCustomer({ variables: { phone, password, redirectUrl } });
            }}
          >
            <TextField
              name="phone"
              autoComplete="phone"
              label="Enter Phone Number"
              minLength={13}
              type="number"
              required
            />
            <TextField
              name="password"
              autoComplete="password"
              label="Password"
              type="password"
              required
            />
            <div className="login__content__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Register"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedAccountRegisterMutation>
    }
    </>
  );
};

export default RegisterForm;
