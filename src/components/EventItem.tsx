import Date from "./Date";
import Link from "next/link";
import {parseISO} from "date-fns";
import {EventContent} from "../lib/events";

type Props = {
  event: EventContent;
};
export default function EventItem({ event }: Props) {
    console.log(event);
    return (
    <Link href={"/events/" + event.slug}>
      <a>
        <Date date={parseISO(event.date)} />
        <h2>{event.name}</h2>
        <img className={"thumbnail"} src={event.thumbnail}  alt={event.name}/>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
            .thumbnail {
              max-width: 100%;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
