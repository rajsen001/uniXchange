import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
// import Moment from "react-moment";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";

const ContentDetails = ({ username, createdAt, edited, preview, college }) => {
  return (
    <Link to={"/users/" + username}>
      <HorizontalStack sx={{}}>
        <UserAvatar width={45} height={45} username={username} />
        <Stack>
          <span className="uppercase text-primary text-[12px] opacity-80 font-semibold">
            {college ? college : "Pune University"}
          </span>
          <span
            color="inherit"
            underline="hover"
            className="text-[12px] text-customGray"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {username}
          </span>
        </Stack>
      </HorizontalStack>
    </Link>
  );
};

export default ContentDetails;
