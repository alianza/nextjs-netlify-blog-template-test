import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
  type: 'posts' | 'events';
};
export default function Tag({ tag, type }: Props) {
  return (
    <Link href={`/${type}/tags/[[...slug]]`} as={`/${type}/tags/${tag.slug}`}>
      <a>{"#" + tag.name}</a>
    </Link>
  );
}
