import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import config from "../../lib/config";
import { listTags, TagContent } from "../../lib/tags";
import EventList from "../../components/event/EventList";
import { countEvents, EventContent, listEventContent } from "../../lib/events";

type Props = {
  events: EventContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ events, tags, pagination }: Props) {
  const url = "/events";
  const title = "All events";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <EventList events={events} tags={tags} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const events = listEventContent(1, config.events_per_page);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countEvents() / config.events_per_page),
  };
  return {
    props: {
      events,
      tags,
      pagination,
    },
  };
};
