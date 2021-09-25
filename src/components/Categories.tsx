import TagLink from "./TagLink";
import React from "react";
import {TagContent} from "../lib/tags";

type Props = {
    tags: TagContent[];
};
export default function Categories({tags}: Props) {
    return (
        <ul className={"categories"}>
            {tags.map((it, i) => (
                <li key={i}>
                    <TagLink tag={it}/>
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
