import { AegisProvider } from "@/providers/aegis-provider";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return <AegisProvider>{children}</AegisProvider>;
}
