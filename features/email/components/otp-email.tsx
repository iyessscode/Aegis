import { getSubjectText, SubjectType } from "@/lib/email";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type OTPEmailProps = {
  otpCode: string;
  purpose: SubjectType;
  userName?: string;
  expiryMinutes: string;
};

export default function OTPEmail({
  otpCode,
  purpose,
  userName = "There",
  expiryMinutes,
}: OTPEmailProps) {
  const getPurposeText = () => {
    switch (purpose) {
      case "sign-in":
        return "sign in to your account";
      case "email-verification":
        return "verify your email address";
      default:
        return "reset your password";
    }
  };

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your verification code: {otpCode}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="mx-auto max-w-[600px] rounded-xl bg-white shadow-lg">
            {/* Main Content */}
            <Section className="px-8 py-10">
              <Heading className="mt-0 mb-6 text-center text-[28px] font-bold text-gray-900">
                {getSubjectText(purpose)}
              </Heading>

              <Text className="mt-0 mb-8 text-[16px] leading-6 text-gray-700">
                Hello {userName}!,
              </Text>

              <Text className="mt-0 mb-8 text-[16px] leading-6 text-gray-700">
                We received a request to {getPurposeText()}. Please use the
                verification code below to complete this action:
              </Text>

              {/* OTP Code Box */}
              <Section className="mb-8 rounded-xl border border-solid border-gray-200 bg-gray-50 px-8 py-6 text-center">
                <Text className="letter-spacing-2 mt-0 mb-2 font-mono text-[36px] font-bold text-gray-900">
                  {otpCode}
                </Text>
                <Text className="mt-0 mb-0 text-[14px] text-gray-600">
                  This code will expire in {expiryMinutes} minutes
                </Text>
              </Section>

              <Text className="mt-0 mb-6 text-[16px] leading-6 text-gray-700">
                If you didn&apos;t request this code, please ignore this email
                or contact our support team if you have concerns.
              </Text>

              <Text className="mt-0 mb-8 text-[16px] leading-6 text-gray-700">
                For your security, never share this code with anyone.
              </Text>

              <Hr className="my-8 border-solid border-gray-200" />

              <Text className="text-[16px] leading-6 text-gray-700">
                Best regards,
                <br />
                The <strong>IyesCode</strong> Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 bg-gray-50 px-8 py-6">
              <Text className="m-0 text-center text-[12px] text-gray-500">
                &copy;2025 Iyesss Code. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OTPEmail.PreviewProps = {
  otpCode: "789012",
};
