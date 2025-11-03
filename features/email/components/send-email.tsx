import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type SendEmailProps = {
  type: "email-verification" | "forget-password" | "sign-in";
  userEmail: string;
  userName: string;
  actionUrl: string;
};

const SendEmail = ({
  type = "forget-password",
  userEmail,
  userName,
  actionUrl,
}: SendEmailProps) => {
  const getEmailContent = () => {
    switch (type) {
      case "email-verification":
        return {
          preview: "Verify your email address to complete your account setup",
          heading: "Verify Your Email Address",
          subheading: "Complete your account setup in just one click",
          greeting: `Hi ${userName},`,
          mainText:
            "Thanks for signing up! To complete your account setup and start using our platform, please verify your email address by clicking the button below.",
          secondaryText:
            "This verification link will expire in 24 hours for security reasons.",
          buttonText: "Verify Email Address",
          buttonColor: "bg-blue-600",
          altText:
            "If the button doesn't work, you can copy and paste this link into your browser:",
          securityNotice:
            "If you didn't create an account with us, please ignore this email. Your email address will not be added to our system.",
        };

      case "forget-password":
        return {
          preview: "Reset your password - secure link inside",
          heading: "Reset Your Password",
          subheading: "We received a request to reset your password",
          greeting: `Hi ${userName},`,
          mainText:
            "Someone requested a password reset for your account. If this was you, click the button below to create a new password.",
          secondaryText:
            "This password reset link will expire in 1 hour for security reasons.",
          buttonText: "Reset Password",
          buttonColor: "bg-red-600",
          altText:
            "If the button doesn't work, you can copy and paste this link into your browser:",
          securityNotice:
            "If you didn't request a password reset, please ignore this email. Your password will remain unchanged.",
        };

      case "sign-in":
        return {
          preview: "New sign-in to your account detected",
          heading: "New Sign-In Detected",
          subheading: "We noticed a new sign-in to your account",
          greeting: `Hi ${userName},`,
          mainText:
            "We detected a new sign-in to your account. If this was you, no action is needed.",
          secondaryText:
            "If you don't recognize this activity, please secure your account immediately by changing your password.",
          buttonText: "Secure My Account",
          buttonColor: "bg-orange-600",
          altText: "If you need help securing your account, visit:",
          securityNotice:
            "For your security, we recommend using strong, unique passwords and enabling two-factor authentication.",
        };

      default:
        return getEmailContent();
    }
  };

  const content = getEmailContent();

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{content.preview}</Preview>
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="mx-auto max-w-[600px] rounded-xl bg-white p-10">
            {/* Header */}
            <Section className="mb-8 text-center">
              <Heading className="m-0 mb-2 text-[28px] font-bold text-gray-900">
                {content.heading}
              </Heading>
              <Text className="m-0 text-[16px] text-gray-600">
                {content.subheading}
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="m-0 mb-4 text-[16px] text-gray-700">
                {content.greeting}
              </Text>
              <Text className="m-0 mb-4 text-[16px] text-gray-700">
                {content.mainText}
              </Text>
              <Text className="m-0 mb-6 text-[16px] text-gray-700">
                {content.secondaryText}
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="mb-8 text-center">
              <Button
                href={actionUrl}
                className={`${content.buttonColor} box-border rounded-xl px-8 py-4 text-[16px] font-semibold text-white no-underline`}
              >
                {content.buttonText}
              </Button>
            </Section>

            {/* Alternative Link - Only for verification and password reset */}
            {type !== "sign-in" && (
              <Section className="mb-8">
                <Text className="m-0 mb-2 text-[14px] text-gray-600">
                  {content.altText}
                </Text>
                <Link
                  href={actionUrl}
                  className="text-[14px] break-all text-blue-600"
                >
                  {actionUrl}
                </Link>
              </Section>
            )}

            {/* Support Link - Only for sign-in */}
            {type === "sign-in" && (
              <Section className="mb-8">
                <Text className="m-0 mb-2 text-[14px] text-gray-600">
                  {content.altText}
                </Text>
                <Link
                  href="https://support.yourapp.com"
                  className="text-[14px] text-blue-600"
                >
                  https://support.yourapp.com
                </Link>
              </Section>
            )}

            {/* Security Notice */}
            <Section className="mb-8 border-t border-solid border-gray-200 pt-6">
              <Text className="m-0 mb-2 text-[14px] text-gray-600">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="m-0 text-[14px] text-gray-600">
                {content.securityNotice}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6">
              <Text className="m-0 mb-2 text-center text-[12px] text-gray-500">
                This email was sent to {userEmail}
              </Text>
              <Text className="m-0 mb-2 text-center text-[12px] text-gray-500">
                © 2025 Your Company Name. All rights reserved.
              </Text>
              <Text className="m-0 text-center text-[12px] text-gray-500">
                123 Business Street, Suite 100, Jakarta, Indonesia
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SendEmail;
