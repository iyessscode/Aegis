import Image from "next/image";

export default function HomePage() {
  return (
    <main className="grid h-screen place-items-center">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-y-8">
        <div className="relative mx-auto h-32 w-96">
          <Image
            src="./logo-text.svg"
            alt="logo"
            fill
            sizes="30vw"
            className="object-contain"
          />
        </div>
        <h3 className="text-center text-4xl font-bold">
          Protected. Verified. Aegis.
        </h3>
        <p className="text-center text-gray-500">
          Aegis is a secure authentication platform built to protect users and
          applications through modern identity management. Designed for
          dark-mode interfaces, it combines robust encryption, seamless user
          experience, and developer-friendly integration. Aegis ensures every
          login is verified, encrypted, and trusted — your digital shield for
          access security.
        </p>
        <button className="mt-4 rounded-full bg-teal-400 px-8 py-2 font-semibold">
          Get Started!
        </button>
      </div>
    </main>
  );
}
