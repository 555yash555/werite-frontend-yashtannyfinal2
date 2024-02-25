import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TownHallCard from "../../components/TownHallCard";

const TownHallList = ({ townHallData, live }) => {
  const [showId, setShowId] = useState(null);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {townHallData?.map((townHall) => (
        <TownHallCard
          townHall={townHall}
          showId={showId}
          setShowId={setShowId}
          key={townHall.post_id}
          live={live}
        />
      ))}
    </div>
  );
};

export default TownHallList;
