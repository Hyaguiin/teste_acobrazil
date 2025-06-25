const express = require("express");
const cors = require("cors");
const { ALLOWED_ORIGINS } = require("../utils/url");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/authRoutes");
const checklistRoutes = require("../routes/checkListRoutes");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/checklists", checklistRoutes);

app.get("/", async (req, res) => {
  try {
    res.status(200).send({ message: "API is working properly!" });
  } catch (err) {
    if (err instanceof Error) {
      console.error("[Error]: ", err.message);
      res.status(500).send({ error: err.message });
    } else {
      res.status(500).send({ error: "Unknown error" });
    }
  }
});

module.exports = app;
