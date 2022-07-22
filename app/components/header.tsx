import Link from "next/link";
import { ConnectButton } from "components/connect";

const Header = () => {
  return (
    <header className="py-4 px-4 sm:px-8 flex justify-between flex-col sm:flex-row gap-4">
      <h1 className="font-semibold text-2xl self-center sm:self-start">
        <Link href="/">
          <a>Colloquium</a>
        </Link>
      </h1>
      <section className="flex items-center gap-2 self-center">
        <Link href="/read">
          <a className="font-medium px-3 py-1 bg-slate-100 rounded">Read</a>
        </Link>
        <Link href="/write">
          <a className="font-medium px-3 py-1 bg-slate-100 rounded">Write</a>
        </Link>
        <ConnectButton />
      </section>
    </header>
  );
};

export default Header;
