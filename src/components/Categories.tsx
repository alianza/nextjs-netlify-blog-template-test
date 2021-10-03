import TagLink from "./TagLink";
import LocationLink from "./LocationLink";
import React from "react";
import { TagContent } from "../lib/tags";
import { LocationContent } from "../lib/locations";

type Props = {
    tags?: TagContent[];
    locations?: LocationContent[];
    type: 'posts' | 'events';
};
export default function Categories({ tags, locations, type }: Props) {
    return (
        <ul className={"categories"}>
            {tags && <li><h3>Tags:</h3></li>}
            {tags?.map((tag, i) => (
                <li key={i}>
                    <TagLink tag={tag} type={type}/>
                </li>
            ))}
            {locations && <li><h3>Locations:</h3></li>}
            {locations?.map((location, i) => (
                <li key={i}>
                    <LocationLink location={location} type={type}/>
                </li>
            ))}
            <style jsx>
                {`
                  ul {
                    margin: 0;
                    padding: 0;
                  }
                  li {
                    list-style: none;
                  }
                  .categories {
                    display: none;
                    padding-left: 1em;
                    margin: 0;
                  }

                  .categories li {
                    margin-bottom: 0.75em;
                  }

                  @media (min-width: 769px) {
                    .categories {
                      display: block;
                    }
                  }
                `}
            </style>
        </ul>
    );
}
