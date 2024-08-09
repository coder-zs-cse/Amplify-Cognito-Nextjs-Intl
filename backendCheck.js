
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-south-1' // replace with your region
});
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri:
    "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_mfuXQcbaE/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const token = ""

// console.log(token);


jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
  if (err) {
    console.log("inavalid token");
    
  }
  else console.log("token is valid");
  
  // Token is valid, you can now use the decoded information
  const userId = decoded.sub;
  const email = decoded.email;

    console.log("decoded", decoded);
    
    getUserAttributes(token).then((data) => {
      console.log("user attributes", data);
    });
  
});


const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

function getUserAttributes(accessToken) {
  const params = {
    AccessToken: accessToken
  };

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.getUser(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        resolve(data.UserAttributes);
      }
    });
  });
}
