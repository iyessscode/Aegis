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

type ChangeEmailVerificationProps = {
  username: string;
  verificationUrl: string;
  expireMinutes: number;
};

const ChangeEmailVerification = ({
  username,
  verificationUrl,
  expireMinutes,
}: ChangeEmailVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Verify your new email address to complete the change</Preview>
        <Body className="py-10t-sans bg-gray-50">
          <Container className="mx-auto max-w-[580px] rounded-[12px] bg-white p-12">
            {/* Brand Header */}
            <Section className="mb-10 text-center">
              <Heading className="mt-0 mb-2 text-[32px] font-bold text-gray-900">
                Aegis
              </Heading>
              <Text className="mb-0 text-[14px] tracking-[1px] text-gray-500 uppercase">
                Security & Trust
              </Text>
            </Section>

            {/* Main Heading */}
            <Section>
              <Heading className="mt-0 mb-8 text-center text-[24px] font-semibold text-gray-900">
                Verify your new email address
              </Heading>
            </Section>

            {/* Main Content */}
            <Section>
              {/* Greeting */}
              <Text className="mb-6 text-[16px] leading-[26px] text-gray-700">
                Hello {username},
              </Text>

              {/* Purpose explanation */}
              <Text className="mb-8 text-[16px] leading-[26px] text-gray-700">
                You recently requested to change your account email address. To
                complete this change and maintain your account security, please
                verify your new email address by clicking the button below.
              </Text>

              {/* CTA Button */}
              <Section className="mb-8 text-center">
                <Button
                  href={verificationUrl}
                  className="box-border inline-block rounded-xl bg-[#f54a00] px-10 py-4 text-[16px] font-medium text-white no-underline"
                >
                  Verify Email
                </Button>
              </Section>

              {/* Expiry Notice */}
              <Section className="mb-8 border-l-4 border-[#f54a00] bg-orange-50 py-4 pl-5">
                <Text className="mb-0 text-[14px] text-orange-800">
                  This verification link expires in {expireMinutes} minutes for
                  your security.
                </Text>
              </Section>

              {/* Alternative Link */}
              <Text className="mb-4 text-[14px] leading-[22px] text-gray-600">
                If the button doesn't work, copy and paste this link:
              </Text>

              <Section className="mb-8 rounded-[6px] bg-gray-50 p-4">
                <Text className="mb-0 font-mono text-[13px] break-all text-gray-700">
                  <Link
                    href={verificationUrl}
                    className="text-[#f54a00] no-underline"
                  >
                    {verificationUrl}
                  </Link>
                </Text>
              </Section>

              {/* Security Notice */}
              <Section className="mb-8 rounded-xl border border-gray-200 p-6">
                <Text className="mb-0 text-[14px] text-gray-700">
                  <strong>Security Notice:</strong> If you didn't request this,
                  please ignore this message.
                </Text>
              </Section>

              <Text className="mb-0 text-[16px] leading-[26px] text-gray-700">
                Best regards,
                <br />
                The Aegis Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-12 border-t border-gray-100 pt-8 text-center">
              <Text className="m-0 mb-3 text-[12px] text-gray-500">
                This is an automated security message from Aegis.
              </Text>

              <Text className="m-0 text-[12px] text-gray-400">
                Aegis ©2025
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ChangeEmailVerification.PreviewProps = {
  verificationUrl: "{{verification_url}}",
};

export default ChangeEmailVerification;
