import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";

export const tokenAuthMutation = gql`
  ${userFragment}
  mutation TokenAuth($phone: String!, $password: String!) {
    tokenCreate(phone: $phone, password: $password) {
      token
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const tokenVeryficationMutation = gql`
  ${userFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;
