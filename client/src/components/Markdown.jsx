import { Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./markdown.css";

const Markdown = ({ content }) => {
  const disallowed = ["Image"];

  return (
    <Typography component="span">
      <ReactMarkdown
        className="markdown text-justify"
        style={{ "&p": { margin: 0 } }}
        disallowedElements={disallowed}
        skipHtml
        children={content}
      />
    </Typography>
  );
};

export default Markdown;
