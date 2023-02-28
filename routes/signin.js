import { createUniqueId } from "./factory.js";



export const getSignin = (req, res, next) => {
  console.log(createUniqueId());
  res.send("getSignin");
}


export const postSignin = (req, res, next) => {
  console.log("postsignin");
  res.send("postSignin");
}