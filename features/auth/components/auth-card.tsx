import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description?: string | React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export const AuthCard = ({
  title,
  description,
  content,
  footer,
}: AuthCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && (
        <CardFooter className="grid w-full gap-4 sm:grid-cols-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
