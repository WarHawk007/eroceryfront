import gql from "graphql-tag";
import { userFragment } from "@sdk/fragments/auth";

import { TypedMutation } from "../../../core/mutations";
import {
  RegisterAccount,
  RegisterAccountVariables
} from "./types/RegisterAccount";

const accountRegisterMutation = gql`
  ${userFragment}
  mutation RegisterAccount($phone: String!, $password: String!) {
    accountRegister(input: { phone: $phone, password: $password}) {
      errors {
        field
        message
      }
      user {
        ...User
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedAccountRegisterMutation = TypedMutation<
  RegisterAccount,
  RegisterAccountVariables
>(accountRegisterMutation);
