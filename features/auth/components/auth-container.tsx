import { FieldSeparator } from "@/components/ui/field";
import { SocialAuth } from "@/features/auth/components/social-auth";

type AuthContainerProps = {
  title: string;
  description?: string | React.ReactNode;
  content: React.ReactNode;
};

export const AuthContainer = ({
  title,
  description,
  content,
}: AuthContainerProps) => {
  return (
    <div className="w-full px-4 sm:px-0">
      <header className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground font-medium">{description}</p>
      </header>
      <main className="mt-6">{content}</main>
      <footer className="">
        <FieldSeparator className="my-4">Or continue with</FieldSeparator>
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <SocialAuth />
        </div>
      </footer>
    </div>
  );
};
