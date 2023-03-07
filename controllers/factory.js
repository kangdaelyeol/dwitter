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
  const timeGap = Date.now() - createAt;
  // I will return 'theTime' variable at the end.
  let theTime;
  // if time gap is under 1 min
  if(timeGap < Minute){
    // there's no function that rounds to the nearest 1000
    // so I have to divide it by 1000, round it down, that will be the corresponding time value with what we show.
    const theSeconds = Math.floor(timeGap / Second);
    // because if the second value is 1, the notaition have to be "second", not "seconds"
    theTime = `${theSeconds} ${theSeconds === 1 ? "second" : "seconds"} ago`;
  } 
  // if time gap is under an hour -> XXX min ago
   else if(timeGap < Hour) {
    const theMinutes = Math.floor(timeGap / Minute);
    theTime = `${theMinutes} ${theMinutes === 1 ? "minute" : "minutes"} ago`;
   }
   // if time gap is under a day -> XXX hours ago
   else if(timeGap < Day) {
    const theHours = Math.floor(timeGap / Hour);
    theTime = `${theHours} ${theHours === 1 ? "hour" : "hours"} ago`;
  }
  // if the time gap is over a day -> display the exact date. 
   else {
    const stringDate = new Date(createAt).toString();
    const slicedDate = stringDate(4, 15);
    // final sequence: replace " " to "/" -> the format of date is gonna be like "Mar/07/2023" (Today)
    theTime = slicedDate.replaceAll(" ", "/");
  }

  return theTime;
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