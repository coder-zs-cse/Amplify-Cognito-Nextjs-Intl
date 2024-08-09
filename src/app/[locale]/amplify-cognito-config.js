"use client";

import { Amplify } from "aws-amplify";

export const authConfig = {
  Cognito: {
    loginWith: {
      oauth: {
        redirectSignIn: [process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGNIN],
        redirectSignOut: [process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGNOUT],
        domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
        scopes: ['openid','email','phone', 'aws.cognito.signin.user.admin'],
        responseType: process.env.NEXT_PUBLIC_OAUTH_RESPONSE_TYPE, // or 'token', note that REFRESH token will only be generated when the responseType is code
      },
    },
    userPoolId: String(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID),
  },
};

// console.log("Auth Config:", authConfig);
Amplify.configure({
  Auth: authConfig,
});

export default function ConfigureAmplifyClientSide() {
  return null;
}
