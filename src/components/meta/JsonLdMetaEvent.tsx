import { Event } from "schema-dts";
import { jsonLdScriptProps } from "react-schemaorg";
import config from "../../lib/config";
import { formatISO } from "date-fns";
import Head from "next/head";

type Props = {
  url: string;
  title: string;
  keywords?: string[];
  date: Date;
  location?: string;
  thumbnail?: string;
  description?: string;
};
export default function JsonLdMetaEvent({
  url,
  title,
  keywords,
  date,
  location,
  thumbnail,
  description,
}: Props) {
  return (
    <Head>
      <script
        {...jsonLdScriptProps<Event>({
          "@context": "https://schema.org",
          "@type": "Event",
          mainEntityOfPage: config.base_url + url,
          about: title,
          startDate: formatISO(date),
          location: location,
          image: thumbnail,
          description: description,
        })}
      />
    </Head>
  );
}
