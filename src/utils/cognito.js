import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '@/config/cognito';


export const registerUser = (email, password, name) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      })
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.user);
    });
  });
};


export const confirmUser = (email, code) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export const resendConfirmationCode = (email) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }
        if (session.isValid()) {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err);
              return;
            }
            const userAttributes = {};
            attributes.forEach(attr => {
              userAttributes[attr.Name] = attr.Value;
            });
            resolve({ ...cognitoUser, attributes: userAttributes });
          });
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
};

export const logoutUser = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};