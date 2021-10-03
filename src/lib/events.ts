import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const eventsDirectory = path.join(process.cwd(), "content/events");

export type EventContent = {
  readonly name: string;
  readonly title: string;
  readonly slug: string;
  readonly date: string;
  readonly thumbnail: string;
  readonly location: string;
  readonly fullPath: string;
};

let postCache: EventContent[];

export function fetchEventContent(): EventContent[] {
  if (postCache) {
    return postCache;
  }
  // Get file names under /events
  const fileNames = fs.readdirSync(eventsDirectory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        title: string;
        name: string;
        thumbnail: string;
        location: string;
        slug: string;
        fullPath: string,
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return postCache;
}

export function countEvents(): number {
    return fetchEventContent().length;
}

export function countEventsByLocation(location?: string): number {
    return fetchEventContent().filter(
        (it) => !location || (it.location && it.location.includes(location))
    ).length;
}

export function listEventContent(
  page: number,
  limit: number,
): EventContent[] {
  return fetchEventContent()
    .slice((page - 1) * limit, page * limit);
}

export function listEventContentByLocation(
    page: number,
    limit: number,
    location: string
): EventContent[] {
    return fetchEventContent()
        .filter((it) => !location || (it.location && it.location.includes(location)))
        .slice((page - 1) * limit, page * limit);
}
