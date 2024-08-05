export const loginErrorMessage = (error) => {
  if (error instanceof Error) {
    switch (error.name) {
      case "UserNotFoundException":
        return "No user found with this email. Please check your email or sign up.";
      case "NotAuthorizedException":
        return "Incorrect username or password. Please try again.";
      case "UserNotConfirmedException":
        return "Your account is not verified. Please check your email for a verification link.";
      case "PasswordResetRequiredException":
        return "You need to reset your password. Redirecting to password reset page...";
      case "NetworkError":
        return "Network error. Please check your internet connection and try again.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  } else {
    return "An unexpected error occurred. Please try again later.";
  }
};

export const registerErrorMessage = (error) => {
  if (error instanceof Error) {
    switch (error.name) {
      case "UsernameExistsException":
        return "An account with this email already exists. Please use a different email or try to login.";
      case "InvalidPasswordException":
        return "Password does not meet the requirements. It should be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.";
      case "InvalidParameterException":
        return "Invalid input. Please check your details and try again.";
      case "CodeDeliveryFailureException":
        return "Failed to send verification code. Please check if the email address is correct.";
      case "LimitExceededException":
        return "Too many attempts. Please try again later.";
      case "TooManyRequestsException":
        return "Too many requests. Please wait a while before trying again.";
      case "NotAuthorizedException":
        return "Not authorized to perform the registration. Please check your credentials.";
      case "UserLambdaValidationException":
        return "Registration failed due to custom validation. Please check your input.";
      case "NetworkError":
        return "Network error. Please check your internet connection and try again.";
      default:
        console.error("Registration error:", error);
        return "An unexpected error occurred during registration. Please try again later.";
    }
  } else {
    console.error("Unknown registration error:", error);
    return "An unexpected error occurred during registration. Please try again later.";
  }
};

export const confirmEmailErrorMessage = (error) => {
  if (error instanceof Error) {
    switch (error.name) {
      case "CodeMismatchException":
        return "Invalid verification code. Please check the code and try again.";
      case "ExpiredCodeException":
        return "The verification code has expired. Please request a new code.";
      case "UserNotFoundException":
        return "User not found. Please ensure you have registered.";
      case "NotAuthorizedException":
        return "Not authorized to confirm this account. Please check your credentials.";
      case "LimitExceededException":
        return "Too many attempts. Please try again later.";
      case "TooManyFailedAttemptsException":
        return "Too many failed attempts. Please request a new code and try again.";
      case "TooManyRequestsException":
        return "Too many requests. Please wait a while before trying again.";
      case "AliasExistsException":
        return "This email is already associated with another account.";
      case "NetworkError":
        return "Network error. Please check your internet connection and try again.";
      default:
        console.error("Email confirmation error:", error);
        return "An unexpected error occurred during email confirmation. Please try again later.";
    }
  } else {
    console.error("Unknown email confirmation error:", error);
    return "An unexpected error occurred during email confirmation. Please try again later.";
  }
};
