import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import config from "../../../lib/config";
import { countPosts } from "../../../lib/posts";
import EventList from "../../../components/event/EventList";
import { countEvents, EventContent, listEventContent } from "../../../lib/events";
import { listLocations, LocationContent } from "../../../lib/locations";

type Props = {
  events: EventContent[];
  locations: LocationContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({ events, locations, pagination, page }: Props) {
  const url = `/events/page/${page}`;
  const title = "All events";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <EventList events={events} locations={locations} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const events = listEventContent(page, config.events_per_page);
  const locations = listLocations();
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.events_per_page),
  };
  return {
    props: {
      page,
      events,
      locations,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countEvents() / config.events_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
