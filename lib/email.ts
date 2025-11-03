export type SubjectType = "sign-in" | "email-verification" | "forget-password";

export const getSubjectText = (type: SubjectType) => {
  switch (type) {
    case "sign-in":
      return "Sign In Verification";
    case "email-verification":
      return "Email Verification";
    default:
      return "Password Reset";
  }
};
