import { Film } from "../api/types";
import * as UI from "@mui/material";
import { CinemaResult } from "../components/CinemaResult";
import { groupBy, mapValues, sortBy } from "lodash";

export const ByCinema: React.FC<{ films: Film[] }> = ({ films }) => {
  const listings = mapValues(
    groupBy(
      films.flatMap((film) =>
        film.times.map((showtime) => ({ ...showtime, film }))
      ),
      "site"
    ),
    (times) => sortBy(times, "starts_at")
  );

  const cinemas = Object.keys(listings).sort();

  return (
    <>
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
    </>
  );
};
