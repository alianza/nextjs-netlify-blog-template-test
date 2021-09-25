import {GetStaticPaths, GetStaticProps} from "next";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import {TwitterTweetEmbed} from "react-twitter-embed";
import {fetchEventContent} from "../../lib/events";

export type Props = {
  title: string;
  name: string;
  dateString: string;
  thumbnail: string;
  slug: string;
  tags: string[];
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
  dateString,
  slug,
  tags,
  location,
  description = "",
  source,
}: Props) {
  const content = hydrate(source, { components })
  return (
    // <PostLayout // Change!to EventLayout
    //   title={title}
    //   date={parseISO(dateString)}
    //   slug={slug}
    //   tags={tags}
    //   author={location}
    //   description={description}
    // >
    //   {content}
    // </PostLayout>
      <></>
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
      tags: data.tags,
      location: data.location,
      source: mdxSource
    },
  };
};

