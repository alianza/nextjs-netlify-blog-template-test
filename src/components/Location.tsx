import { LocationContent } from "../lib/locations";
import LocationLink from "./LocationLink";

type Props = {
  location: LocationContent;
};
export default function Location({ location }: Props) {
    return (
    <>
    <span>At: <LocationLink location={location} type={'events'}/></span>
      <style jsx>
        {`
          span {
            color: #9b9b9b;
          }
        `}
      </style>
    </>
  );
}
