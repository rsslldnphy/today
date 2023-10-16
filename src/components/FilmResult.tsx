import { Film, Metadata } from "../api/types";
import * as UI from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import _ from "lodash";
import format from "date-fns/format";

export const FilmResult: React.FC<{ film: Film & Metadata }> = ({ film }) => {
  [];
  return (
    <UI.Card elevation={2} sx={{ mb: 3 }}>
      <UI.CardMedia
        component="img"
        alt={film.title}
        height="200"
        image={film.backdrop ?? "https://rsslldnphy.com/today/images/grid.jpg"}
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
          {film.overview}
        </UI.Typography>
        {_.map(_.groupBy(film.times, "site"), (showings, site) => (
          <UI.Box key={site} sx={{ my: 2 }}>
            <UI.Typography sx={{ fontWeight: "bold" }}>{site}</UI.Typography>
            {showings.map((showing) => (
              <UI.Chip
                key={showing.starts_at}
                component="a"
                href={showing.url ?? film.url}
                target="_blank"
                label={format(new Date(showing.starts_at), "HH:mmaaa")}
                clickable
                sx={{ mr: 1, mt: 1 }}
              />
            ))}
          </UI.Box>
        ))}
      </UI.CardContent>
    </UI.Card>
  );
};
