import { useQuery } from "@tanstack/react-query";
import { groupBy, mergeWith, sortBy } from "lodash";
import { getFilms } from "./getFilms";
import { getMetadata } from "./getMetadata";
import { Film, Metadata } from "./types";

export const useFilmsQuery = (): Record<string, (Film & Metadata)[]> => {
  const { data: curzon } = useQuery(["curzon"], () => getFilms("curzon"));

  const { data: princecharles } = useQuery(["princecharles"], () =>
    getFilms("princecharles")
  );

  const { data: metadata } = useQuery(["metadata"], () => getMetadata());

  if (!curzon || !princecharles || !metadata) {
    return {};
  }

  return mergeWith({}, curzon, princecharles, (a, b) => {
    if (!a) return b;
    if (!b) return a;
    const grouped = groupBy([...a, ...b], (f) => f.title);
    const titles = Object.keys(grouped);
    return titles.map((title) => ({
      ...grouped[title][0],
      ...metadata[title],
      times: sortBy(
        grouped[title].flatMap((f) => f.times),
        "starts_at"
      ),
    }));
  });
};
