import React from "react";
import styles from "../../../public/styles/content.module.css";
import Copyright from "../Copyright";
import Date from "../Date";
import Layout from "../Layout";
import BasicMeta from "../meta/BasicMeta";
import OpenGraphMeta from "../meta/OpenGraphMeta";
import TwitterCardMeta from "../meta/TwitterCardMeta";
import { SocialList } from "../SocialList";
import { getLocation } from "../../lib/locations";
import JsonLdMetaEvent from "../meta/JsonLdMetaEvent";
import Location from "../Location";

type Props = {
  title: string;
  name: string;
  slug: string;
  date: Date;
  thumbnail: string;
  location: string;
  description?: string;
  children: React.ReactNode;
};
export default function EventLayout({
  title,
  date,
  slug,
  location,
  description = "",
  children,
}: Props) {
  const locationName = getLocation(location).name;
  return (
    <Layout>
      <BasicMeta
        url={`/events/${slug}`}
        title={title}
        keywords={[location]}
        description={description}
      />
      <TwitterCardMeta
        url={`/events/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/events/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMetaEvent
        url={`/events/${slug}`}
        title={title}
        keywords={[location]}
        date={date}
        location={locationName}
        description={description}
      />
      <div className={"container"}>
        <article>
          <header>
            <h1>{title}</h1>
            <div className={"metadata"}>
              <div>
                <Date date={date} />
              </div>
              <div>
                <Location location={getLocation(location)} />
              </div>
            </div>
          </header>
          <div className={styles.content}>{children}</div>
        </article>
        <footer>
          <div className={"social-list"}>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
            .container {
              display: block;
              max-width: 36rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
              z-index: 0;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              flex: 1 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
                flex-direction: column;
              }
            }
          `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html .token.tag .token.attr-value .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}
