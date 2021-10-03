import React from "react";
import Pagination from "../Pagination";
import { EventContent } from "../../lib/events";
import EventItem from "./EventItem";
import { LocationContent } from "../../lib/locations";

type Props = {
  events: EventContent[];
  location: LocationContent;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function LocationEventList({ events, location, pagination }: Props) {
  return (
    <div className={"container"}>
      <h1>
        All events @ <span>{location.name}</span>
      </h1>
      <ul>
        {events.map((it, i) => (
          <li key={i}>
            <EventItem event={it} />
          </li>
        ))}
        {!events.length && <div>No Events @ location <b>{location.name}</b>!</div>}
      </ul>
        {/*{ router.isFallback && <div>No Events with location!</div> }*/}
      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: () => "/events/locations/[[...slug]]",
          as: (page) =>
            page === 1
              ? "/events/locations/" + location.slug
              : `/events/locations/${location.slug}/${page}`,
        }}
      />
      <style jsx>
        {`
          .container {
            margin: 0 auto;
            max-width: 1200px;
            width: 100%;
            padding: 0 1.5rem;
            display: flex;
            flex-direction: column;
          }
          h1 {
            margin: 0 0 2rem;
            padding: 0;
            font-weight: 100;
            font-size: 1.75rem;
            color: #9b9b9b;
          }
          h1 span {
            font-weight: bold;
            color: #222;
          }
          ul {
            margin: 0;
            padding: 0;
            flex: 1 0 auto;
          }
          li {
            list-style: none;
            margin-bottom: 1.5rem;
          }

          @media (min-width: 769px) {
            h1 {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}
