export type SubjectType = "sign-in" | "email-verification" | "forget-password";

export const getSubjectText = (type: SubjectType) => {
  switch (type) {
    case "sign-in":
      return "Sign-in Verification Code";
    case "email-verification":
      return "Email Verification Code";
    default:
      return "Password Reset Code";
  }
};
