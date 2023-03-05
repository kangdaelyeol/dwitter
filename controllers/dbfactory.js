import Users from "../models/user.js"
import Comments from "../models/comment.js"
import { createUniqueId } from "./factory.js";

// this is the file for DB schema including method for CRUD method

/* get accountId of User Schema
   and Check if it exists
   return Boolean variables.
*/
export const existUserById = (id) => {
  console.log("existUserByID", id);
  const everyCB = (key) => { 
    console.log(key);
    const uacid = Users[key].accountId;
    console.log(uacid, id);
    if(uacid === id) return true;
    return false;
  }
  const result = Object.keys(Users).some(everyCB);

  return result;
}

// check if it exist that is matchted with the condition(Objects) whtch
// have to be allocated the key that the User model has.

export const existUserByCondition = (cond) => {
  const key = Object.keys(cond)[0];
  const value = cond[`${key}`];
  console.log(key, value);
  const result = Object.keys(Users).some(k => {
    return Users[`${k}`][`${key}`] === value;
  })
  console.log(result);
  return result;
}

// return value: false -> boolean, true -> Object (user)
// receiving param -> id(accoundId)
export const findUserById = (id) => {
  const result = Object.keys(Users).find((key) => {
    const uacid = Users[key].accountId;
    if(uacid === id) return true;
    return false;    
  })

  if(!result) return false;

  // the value of result is uniqueId
  const user = {
    ...Users[`${result}`],
    comments: [...Users[`${result}`].comments]
  }

  return user;
}

// it's for the createComment Function,
// because when a comment obj is created, the information has to be added to the userInfo,
// in the comments Array.
const putCommentIdInfoToTheUser = (commentId, userId) => {
  Users[`${userId}`].comments.push(commentId);
  console.log(Users, "created", userId, commentId);
}

export const createComment = (content, owner) => {
  const id = createUniqueId();
  const createAt = Date.now();
  const comment = {
    id,
    content,
    createAt,
    owner
  }

  Comments[`${id}`] = {
    ...comment
  }

  // also have to comments id information in the USER DB's the user
  putCommentIdInfoToTheUser(id, owner); 
}

/** functionName: getComments
 * it can return comments informaiton
 * the param, userID value, is an option
 * if you don't put value in the param, it will return all informaitons
 * but if the param is filled out,
 * it will return comments information that the owner's own.
 */
export const getComments = (userId) => {
  // the comments will be returned with "deep cooy" process.
  
  const newComments = {}

  // when userId isn't given
  if(!userId){
    Object.keys(Comments).forEach(key => {
      const comment = {
        ...Comments[`${key}`]
      }
      newComments[`${key}`] = comment;
    })
  } else {
    // when userId is given -> use Filter
    Object.keys(Comments).forEach(key => {
      // the userId(unique Numner) must be 'owner' property
      const userIdOfComment = Comments[`${key}`].owner;
      if(userId === userIdOfComment) return;
      else{
        const comment = {
          ...Comments[`${key}`]
        }
        newComments[`${key}`] = comment;
      }
    });
  }


  return newComments;
}