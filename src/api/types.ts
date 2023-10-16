export type Showing = {
  starts_at: string;
  site: string;
  url?: string;
};

export type Film = {
  title: string;
  trailer?: string;
  times: Showing[];
  url?: string;
};

export type Metadata = {
  backdrop?: string;
  poster?: string;
  overview?: string;
  release_date?: string;
};
