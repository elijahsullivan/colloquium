import Header from "components/header";
import Head from "next/head";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex min-h-screen flex-col container mx-auto max-w-4xl selection:bg-indigo-100">
      <Head>
        <title>Colloquium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col px-4 sm:px-8 pt-4 sm:pt-8 min-w-full grow">
        {children}
      </main>
    </div>
  );
}
