import React from "react";
import Pagination from "./Pagination";
import {TagContent} from "../lib/tags";
import {EventContent} from "../lib/events";
import EventItem from "./EventItem";
import Categories from "./Categories";

type Props = {
  events: EventContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function EventList({ events, tags, pagination }: Props) {
  return (
    <div className={"container"}>
      <div className={"events"}>
        <ul className={"event-list"}>
          {events.map((it, i) => (
            <li key={i}>
              <EventItem event={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/events" : "/events/page/[page]"),
            as: (page) => (page === 1 ? null : "/events/page/" + page),
          }}
        />
      </div>
      <Categories tags={tags}/>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .events {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .events li {
          margin-bottom: 1.5rem;
        }
        .event-list {
          flex: 1 0 auto;
        }
      `}</style>
    </div>
  );
}
