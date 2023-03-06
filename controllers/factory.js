const Second = 1000;
const Minute = Second * 60;
const Hour = Minute * 60;
const Day = Hour * 24;


/*
  Method: createUniqueId
  Description: return random number that will be used for unique ID.
  required param: none
  type of return value: number
 */
export const createUniqueId = () => {
  
  const timeNum = Date.now();
  const randomNum = Math.random();
  const uniqueId = Math.floor(timeNum * randomNum);
  return uniqueId;
}


// ** TO DO List
/** function name: changeFormatOfCreateAt
 * description: get createAt(Number) and just change the formate of string suitable for showing to clients
 * depends on the gap of time value.
*/
const changeFormatOfCreateAt = (createAt) => {
  // I will show the time Data till it's under "7 days ago"
  
}

/** function name: finalModifyComments
 *  description: get populated data, then modify it as the format of data
 * which is suitable for showing to clients
 * all I have to do is pick up only required data.
 * received data(param): populated comments DB model
 * return value: Object
 * 
 * required data - owner(nickname, profile, id), content, createAt(modified: String)
 */
export const finalModifyComments = (comments) => {
  const newComments = {};
  Object.keys(comments).forEach(k => {
    const comment = comments[`${k}`];
    const owner = comment.owner;

    // required data
    const nickname = owner.nickname;
    const profile = owner.profile;
    const ownerId = owner.id;
    const content = comment.content;
    const createAt = changeFormatOfCreateAt(comment.createAt);

    newComments[`${k}`] = {
      nickname,
      profile,
      ownerId,
      content,
      createAt
    }
  });
  
  return newComments;
}