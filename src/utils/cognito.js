import { redirect } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";

// import { GoogleOAuth } from 'aws-amplify';
// import { Auth } from 'aws-amplify/auth';

export const registerUser = async (email, password, name) => {
  try {
    const { user } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        }
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const confirmUser = async (email, code) => {
  try {
    return await confirmSignUp({ username: email, confirmationCode: code });
  } catch (error) {
    throw error;
  }
};

export const resendConfirmationCode = async (email) => {
  try {
    return await resendSignUpCode({ username: email });
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  console.log("inside loginUser");

  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log("isSignedIn", isSignedIn);
    console.log("nextStep", nextStep);
    
  } catch (error) {
    throw error;
  } 
};





export const getCurrentAuthenticatedUser = async () => {
  try {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    return { ...user, attributes };
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};




// export const googleRegister = async () => {
//   try {
//     // Initialize the Google OAuth provider
//     await GoogleOAuth.configure({
//       // Replace with your Google OAuth client ID
//       clientId: 'YOUR_GOOGLE_OAUTH_CLIENT_ID',
//       // Replace with your Google OAuth client secret
//       clientSecret: 'YOUR_GOOGLE_OAUTH_CLIENT_SECRET',
//       // Replace with your Google OAuth redirect URI
//       redirectSignIn: 'https://your-app.com/redirect',
//       redirectSignOut: 'https://your-app.com/signout',
//     });

//     // Sign in with Google
//     const { user } = await Auth.federatedSignIn({ provider: 'Google' });

//     // Get the user's attributes from the Google profile
//     const { email, name, picture } = user.attributes;

//     // Check if the user already exists in Cognito
//     try {
//       const currentUser = await Auth.currentAuthenticatedUser();
//       // User already exists, so no need to register
//       return currentUser;
//     } catch (error) {
//       // User doesn't exist, so register them
//       const { username } = await Auth.signUp({
//         username: email,
//         password: 'RANDOM_PASSWORD', // You can set a random password for Google sign-ups
//         attributes: {
//           email,
//           name,
//           picture,
//         },
//       });

//       // Confirm the user's registration
//       await Auth.confirmSignUp(username, 'CONFIRMATION_CODE');

//       // Return the registered user
//       return { username, email, name, picture };
//     }
//   } catch (error) {
//     console.error('Error during Google registration:', error);
//     throw error;
//   }
// };