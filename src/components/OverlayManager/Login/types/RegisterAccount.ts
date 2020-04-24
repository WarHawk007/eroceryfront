/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterAccount
// ====================================================

export interface RegisterAccount_accountRegister_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface RegisterAccount_accountRegister_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface RegisterAccount_accountRegister {
  __typename: "AccountRegister";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: RegisterAccount_accountRegister_errors[] | null;
  user: RegisterAccount_accountRegister_user | null;
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
}

export interface RegisterAccount {
  /**
   * Register a new user.
   */
  accountRegister: RegisterAccount_accountRegister | null;
}

export interface RegisterAccountVariables {
  phone: string;
  password: string;
  redirectUrl: string;
}
