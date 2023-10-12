import * as api from "../api";
import { useQuery } from "@tanstack/react-query";
import * as UI from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import _ from "lodash";
import format from "date-fns/format";

export const FilmResult: React.FC<{ film: api.Film }> = ({ film }) => {
  [];
  const { data: poster } = useQuery(["film", film.title], () =>
    api.poster(film.title)
  );
  return (
    <UI.Card elevation={2} sx={{ mb: 3 }}>
      <UI.CardMedia
        component="img"
        alt={film.title}
        height="200"
        image={poster ?? "default.jpg"}
      />
      <UI.CardContent>
        <UI.Typography variant="h5" component="div" sx={{ pb: 1 }}>
          {film.title}{" "}
          {film.trailer && (
            <UI.Link variant="h5" href={film.trailer}>
              <OpenInNew
                sx={{
                  height: "20px",
                  width: "20px",
                  verticalAlign: "middle",
                }}
              />
            </UI.Link>
          )}
        </UI.Typography>
        <UI.Typography variant="body2" component="div">
          {_.take(film.synopsis, 300)}
          {film.synopsis.length > 300 ? "..." : ""}
        </UI.Typography>
        {_.map(_.groupBy(film.times, "site"), (showings, site) => (
          <UI.Box key={site} sx={{ my: 2 }}>
            <UI.Typography sx={{ fontWeight: "bold" }}>
              Curzon {site}
            </UI.Typography>
            <UI.Grid container>
              {showings.map((showing) => (
                <UI.Grid key={showing.starts_at} item xs={3}>
                  {format(new Date(showing.starts_at), "HH:mmaaa")}
                </UI.Grid>
              ))}
            </UI.Grid>
          </UI.Box>
        ))}
      </UI.CardContent>
    </UI.Card>
  );
};
