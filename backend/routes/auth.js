import { Router } from "express";

const authRouter = Router();
authRouter.get("/auth1", (req, res) => {
  res.send("On the auth page 1");
});
authRouter.get("/auth2", (req, res) => {
  res.send("On the auth page 222");
});

export default authRouter;