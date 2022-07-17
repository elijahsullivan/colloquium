import Link from "next/link";
import { useStorageReadJSON } from "core/storage";
import { useFormatAddress } from "hooks/useFormatAddress";

interface ArticleProps {
  minter: string;
  tokenId: string;
  cid: string;
}

const Loader = () => (
  <div className="animate-pulse w-100 md:w-1/2 h-6 bg-slate-300 rounded"></div>
);

const Article = ({ minter, cid }: ArticleProps) => {
  const username = useFormatAddress({ address: minter });
  const { data, isLoading, isError } = useStorageReadJSON(cid);
  if (isLoading || isError) return null;
  if (isError) return <div>Error loading {cid}</div>;
  if (isLoading) return <Loader />;
  return (
    <li>
      <Link href={`/read/${cid}`}>
        <a className="underline font-medium text-xl">{data?.title}</a>
      </Link>
      <span> by </span>
      <Link href={`/author/${minter}`}>
        <a className="underline inline bg-purple-100 rounded py-1 px-2">
          {username}
        </a>
      </Link>
    </li>
  );
};

export default Article;
