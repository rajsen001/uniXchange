import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillEdit,
  AiOutlineMessage,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost, unlikePost, updatePost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";

import LikeBox from "./LikeBox";
import PostContentBox from "./PostContentBox";
import HorizontalStack from "./util/HorizontalStack";

import {} from "react-icons/ai";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";

import "./postCard.css";
import { MdCancel } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import UserLikePreview from "./UserLikePreview";

const PostCard = (props) => {
  const { preview, removePost } = props;
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData.poster.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.customGray;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };

  return (
    <Card sx={{ padding: 0 }} className="post-card bg-white">
      <HorizontalStack spacing={0} alignItems="initial">
        <PostContentBox clickable={preview} post={post} editing={editing}>
          <HorizontalStack justifyContent="space-between">
            <ContentDetails
              username={post.poster.username}
              createdAt={post.createdAt}
              college={post.poster?.college}
              edited={post.edited}
              preview={preview === "secondary"}
            />
            <Box>
              {user &&
                (isAuthor || user.isAdmin) &&
                preview !== "secondary" && (
                  <HorizontalStack>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleEditPost}
                    >
                      {editing ? (
                        <MdCancel color={iconColor} />
                      ) : (
                        <AiFillEdit color={iconColor} />
                      )}
                    </IconButton>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleDeletePost}
                    >
                      {confirm ? (
                        <AiFillCheckCircle color={theme.palette.error.main} />
                      ) : (
                        <BiTrash color={theme.palette.error.main} />
                      )}
                    </IconButton>
                  </HorizontalStack>
                )}
            </Box>
          </HorizontalStack>

          <div className="mt-4 text-lg font-semibold mb-5">{post.title}</div>

          {preview !== "secondary" &&
            (editing ? (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={post.content}
              />
            ) : (
              <Box
                maxHeight={maxHeight}
                overflow="hidden"
                className="content pr-8"
              >
                <Markdown content={post.content} />
              </Box>
            ))}

          <HorizontalStack sx={{ mt: 2 }} justifyContent="space-between">
            <div className="flex row">
              <div
                className="flex items-center bg-slate-100 py-1 px-2 rounded-md cursor-pointer"
                onClick={() => navigate("/posts/" + post._id)}
              >
                <AiOutlineMessage size={"20px"} />
                <span className="ml-2 cursor-pointer">{post.commentCount}</span>
              </div>
              <LikeBox
                likeCount={likeCount}
                liked={post.liked}
                onLike={handleLike}
              />
            </div>
            <Box>
              <UserLikePreview
                postId={post._id}
                userLikePreview={post.userLikePreview}
              />
            </Box>
          </HorizontalStack>
        </PostContentBox>
      </HorizontalStack>
    </Card>
  );
};

export default PostCard;
