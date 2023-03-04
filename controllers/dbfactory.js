import Users from "../models/user.js"
import Comments from "../models/comment.js"

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