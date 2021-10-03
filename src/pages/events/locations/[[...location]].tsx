import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import config from "../../../lib/config";
import { countEventsByLocation, EventContent, listEventContentByLocation } from "../../../lib/events";
import { getLocation, listLocations, LocationContent } from "../../../lib/locations";
import LocationEventList from "../../../components/event/LocationEventList";

type Props = {
  events: EventContent[];
  location: LocationContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ events, location, pagination, page }: Props) {
  const url = `/events/locations/${location.name}` + (page ? `/${page}` : "");
  const title = location.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <LocationEventList events={events} location={location} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.location as string[];
  const [slug, page] = [queries[0], queries[1]];
  const events = listEventContentByLocation(
    page ? parseInt(page as string) : 1,
    config.events_per_page,
      slug
  );
  const location = getLocation(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countEventsByLocation(slug) / config.events_per_page),
  };
  const props: {
    events: EventContent[];
    location: LocationContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = {
    events,
    location,
    pagination
  };

  if (page) {
    props.page = page;
  }

  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listLocations().flatMap((location) => {
    const pages = Math.ceil(countEventsByLocation(location.slug) / config.events_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { location: [location.slug] },
          }
        : {
            params: { location: [location.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
