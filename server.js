const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const { authSocket, socketServer } = require("./socketServer");
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const PostLike = require("./models/PostLike");
const Post = require("./models/Post");

dotenv.config();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB connected");
  }
);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Listening");
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);

// Catching Errors -> a very basic error handler
app.use((err, req, res, next) => {
  console.log("Inside Error Handler function....");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err);

  // WHEN DATA IS REQUESTED THROUGH API
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      err: err.status,
      errror: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // WHEN PAGE IS REQUESTED
  else {
    if (err.statusCode === 401) {
      return res.status(err.statusCode).render("login", {
        title: "Login to Continue!!",
      });
    }

    res.status(err.statusCode).render("error", {
      title: "Something went wrong!!",
      message: err.message,
    });
  }
});

// END OF ERROR HANDLER FUNC

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
