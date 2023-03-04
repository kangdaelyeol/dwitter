import { existUserById, findUserById } from "./dbfactory.js";

/** signinCheck
 * create at: 28/2/2023
 * description: get id and password,
 * if the account exists for the ID, get the information
 *  to verify that the received password matches with existing password,
 *  so if the password matches, return the user Information.
 */
export const signinCheck = (id, password) => {

  // check if the account for id exists 
  const isexist = existUserById(id);
  console.log(isexist);
  if(!isexist){
    return {
      result: false,
      message: "the Account for ID doesn't exist! fuck you!" 
    }
  };

  // check whether the password matches or not
  const userInfo = findUserById(id);
  console.log(password, userInfo)
  if(String(password) !== userInfo.password) {
    return {
      result: false,
      message: "password doesn't match! fuck you!"
    }
  };

  return {
    result: {...userInfo},
    message: "you succeeded!"
  };
}