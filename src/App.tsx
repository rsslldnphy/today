import * as UI from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as api from "./api";
import _ from "lodash";
import { useEffect } from "react";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import format from "date-fns/format";
import { ByCinema } from "./ByCinema";
import { ByFilm } from "./ByFilm";
import { Route, Routes, useParams } from "react-router";

function App() {
  const { date, tab } = useParams();

  const hidden = UI.useMediaQuery("300px");
  const { data } = useQuery(["curzon"], api.curzon);
  const dates =
    (data && (hidden ? Object.keys(data) : _.take(Object.keys(data), 3))) ?? [];

  useEffect(() => {
    if (!date && data && Object.keys(data)[0]) {
      window.location.href = `/today/${Object.keys(data)[0]}/by-film`;
    }
  }, [date, data]);

  if (!data) return null;

  const films = _.sortBy(data[date!], "title");
  return (
    <>
      <UI.AppBar position="fixed" color="default">
        <UI.Tabs value={date} centered>
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
                value={dateString}
                href={`/today/${dateString}/${tab}`}
                sx={{
                  display: { xl: index > 2 ? "none" : "block", sm: "block" },
                }}
              />
            );
          })}
        </UI.Tabs>
      </UI.AppBar>
      <UI.Toolbar></UI.Toolbar>

      {tab === "by-film" && <ByFilm films={films} />}
      {tab === "by-cinema" && <ByCinema films={films} />}
    </>
  );
}

export default App;
