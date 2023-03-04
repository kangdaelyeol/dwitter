
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