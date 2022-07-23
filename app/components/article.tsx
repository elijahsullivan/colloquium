import Link from "next/link";
import { useStorageRead } from "hooks/useStorageRead";
import { useFormatAddress } from "hooks/useFormatAddress";
import { Article } from "core/types/articles";

const Loader = () => (
  <div className="animate-pulse w-100 md:w-1/2 h-6 bg-slate-300 rounded"></div>
);

const Article = ({ minter, cid }: Article) => {
  const username = useFormatAddress({ address: minter });
  const { data, isLoading, isError } = useStorageRead(cid);
  if (isLoading || isError) return null;
  if (isError) return <div>Error loading {cid}</div>;
  if (isLoading) return <Loader />;
  return (
    <li>
      <Link href={`/read/${cid}`}>
        <a className="underline font-medium text-xl">{data?.title}</a>
      </Link>
      <p className="text-slate-600 line-clamp-2">{data?.body}</p>
      <span> by </span>
      <Link href={`/author/${minter}`}>
        <a className="underline">{username}</a>
      </Link>
    </li>
  );
};

export default Article;
