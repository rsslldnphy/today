import * as UI from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as api from "./api";
import _ from "lodash";
import { useState } from "react";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import format from "date-fns/format";
import { ByCinema } from "./ByCinema";
import { ByFilm } from "./ByFilm";

function App() {
  const page = window.location.pathname.includes("by-cinema")
    ? "by-cinema"
    : "by-film";

  const { data } = useQuery(["curzon"], api.curzon);

  const [tab, setTab] = useState(0);
  const hidden = UI.useMediaQuery("300px");
  if (!data) return null;
  const dates = hidden ? Object.keys(data) : _.take(Object.keys(data), 3);

  const films = _.sortBy(data[dates[tab]], "title");
  return (
    <>
      <UI.AppBar position="fixed" color="default">
        <UI.Tabs value={tab} onChange={(_, value) => setTab(value)} centered>
          {dates.map((dateString, index) => {
            const date = new Date(dateString);
            const label = isToday(date)
              ? "Today"
              : isTomorrow(date)
              ? "Tomorrow"
              : format(date, "EEEE");
            return (
              <UI.Tab
                key={dateString}
                label={label}
                sx={{
                  display: { xl: index > 2 ? "none" : "block", sm: "block" },
                }}
              />
            );
          })}
        </UI.Tabs>
      </UI.AppBar>
      <UI.Toolbar></UI.Toolbar>

      <UI.Box sx={{ textAlign: "center", my: 1 }}>
        {page === "by-film" && (
          <>
            <UI.Typography
              sx={{ px: 2, display: "inline", fontWeight: "bold" }}
            >
              By Film
            </UI.Typography>
            <UI.Link
              href="/today/by-cinema"
              sx={{ px: 2, display: "inline" }}
              color="#666"
            >
              By Cinema
            </UI.Link>
          </>
        )}
        {page === "by-cinema" && (
          <>
            <UI.Link
              href="/today/"
              sx={{ px: 2, display: "inline" }}
              color="#666"
            >
              By Film
            </UI.Link>
            <UI.Typography
              sx={{ px: 2, display: "inline", fontWeight: "bold" }}
            >
              By Cinema
            </UI.Typography>
          </>
        )}
      </UI.Box>
      {page === "by-film" ? (
        <ByFilm films={films} />
      ) : (
        <ByCinema films={films} />
      )}
    </>
  );
}

export default App;
