import React from "react";
import Pagination from "../Pagination";
import { EventContent } from "../../lib/events";
import EventItem from "./EventItem";
import Categories from "../Categories";
import { LocationContent } from "../../lib/locations";

type Props = {
  events: EventContent[];
  locations: LocationContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function EventList({ events, locations, pagination }: Props) {
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
      <Categories locations={locations} type={'events'}/>
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
