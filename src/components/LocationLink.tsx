import Link from "next/link";
import { LocationContent } from "../lib/locations";

type Props = {
  location: LocationContent;
  type: 'posts' | 'events';
};
export default function Tag({ location, type }: Props) {
  return (
    <Link href={`/${type}/locations/[[...slug]]`} as={`/${type}/locations/${location.slug}`}>
      <a>{location.name}</a>
    </Link>
  );
}
