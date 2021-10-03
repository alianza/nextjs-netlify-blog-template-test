import { GetStaticPaths, GetStaticProps } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { fetchEventContent } from "../../lib/events";
import EventLayout from "../../components/event/EventLayout";

export type Props = {
  title: string;
  name: string;
  dateString: string;
  thumbnail: string;
  slug: string;
  location: string;
  description?: string;
  source: MdxRemote.Source;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToEventContent = (eventContents => {
  let hash = {}
  eventContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchEventContent());

export default function Event({
  title,
  name,
  dateString,
  slug,
  location,
  thumbnail,
  description = "",
  source,
}: Props) {
  const content = hydrate(source, { components })
  return (
    <EventLayout
      title={title}
      name={name}
      date={parseISO(dateString)}
      slug={slug}
      thumbnail={thumbnail}
      location={location}
      description={description}
    >
      {content}
    </EventLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchEventContent().map(it => "/events/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.event as string;
  const source = fs.readFileSync(slugToEventContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: "",
      location: data.location,
      source: mdxSource
    },
  };
};

