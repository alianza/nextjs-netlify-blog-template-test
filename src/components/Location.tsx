import { LocationContent } from "../lib/locations";

type Props = {
  location: LocationContent;
};
export default function Location({ location }: Props) {
    return (
    <>
      <span>At: {location.name}</span>
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
