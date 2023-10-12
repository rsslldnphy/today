import * as api from "./api";
import * as UI from "@mui/material";
import { CinemaResult } from "./components/CinemaResult";
import _ from "lodash";

export const ByCinema: React.FC<{ films: api.Film[] }> = ({ films }) => {
  const listings = _.mapValues(
    _.groupBy(
      films.flatMap((film) =>
        film.times.map((showtime) => ({ ...showtime, film }))
      ),
      "site"
    ),
    (times) => _.sortBy(times, "starts_at")
  );

  const cinemas = Object.keys(listings).sort();

  return (
    <UI.Grid container>
      <UI.Grid xs={12} md={3} lg={4} item />
      <UI.Grid item xs={12} md={6} lg={4} sx={{ px: 1, py: 1 }}>
        {cinemas.map((cinema) => {
          return (
            <CinemaResult
              key={cinema}
              cinema={cinema}
              showtimes={listings[cinema]}
            />
          );
        })}
      </UI.Grid>
      <UI.Grid xs={12} md={3} lg={4} item />
    </UI.Grid>
  );
};
