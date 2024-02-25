import randomColor from "randomcolor";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import Masonry from "react-masonry-css";
import PoolCard from "./PoolCard";

const breakpointObj = {
  default: 3,
  3000: 4,
  1800: 3,
  1200: 2,
  500: 1,
};

const MasonryLayout = ({ pools, userStatus }) => {
  // const viewRef = useRef(false);

  // const handleClick = () => {
  //   console.log(viewRef.current);
  //   viewRef.current = true;
  // };

  return (
    <>
      <Masonry breakpointCols={breakpointObj} style={{ display: "flex" }}>
        {pools?.map((pool) => {
          const color = randomColor({
            luminosity: "dark",
            hue: "random",
          });
          return (
            <PoolCard
              key={pool.pool_id}
              pool={pool}
              userStatus={userStatus}
              color={color}
            />
          );
        })}
      </Masonry>
      {/* <Button onClick={handleClick}>
        {viewRef.current == true ? "Show Less" : "View More"}
      </Button> */}
    </>
  );
};

export default MasonryLayout;
