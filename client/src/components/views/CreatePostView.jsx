import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";

const CreatePostView = () => {
  return (
    <>
      <GoBack />
      <GridLayout left={<PostEditor />} right={<Sidebar />} />
    </>
  );
};

export default CreatePostView;
