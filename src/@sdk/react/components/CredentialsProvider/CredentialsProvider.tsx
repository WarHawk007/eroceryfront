import React from "react";

import { useSaleorClient, useSignIn } from "../..";
import { CheckoutContext } from "../../../../checkout/context";
import { IProps } from "./types";

export function CredentialsProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const saleor = useSaleorClient();
  const [signIn] = useSignIn();
  const { update } = React.useContext(CheckoutContext);

  const autoSignIn = async () => {
    const credentials = await (navigator.credentials as any).get({
      password: true,
    });

    if (credentials) {
      await signIn({
        password: credentials.password,
        phone: credentials.id,
      });
    }

    if (update) {
      update({ syncUserCheckout: true });
    }
  };

  React.useEffect(() => {
    if (!saleor.isLoggedIn() && window.PasswordCredential) {
      autoSignIn();
    }
  }, []);

  return children;
}
