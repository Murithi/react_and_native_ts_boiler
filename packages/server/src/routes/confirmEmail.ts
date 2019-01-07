import { Request, Response } from "express";
import { User } from "../entity/User";
import { redis } from "../redis";

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    let targetUrl = `${process.env.FRONTEND_HOST}/login`;
    res.redirect(targetUrl);
  } else {
    res.send("invalid");
  }
  res.send("invalid");
};
