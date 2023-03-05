
// function Name: makeComment
// description: to take 2 param(commentValue: String, userID(StringId)

import { createComment, getComments } from "./dbfactory.js"

// andthen make the comment data and put it in DB
export const makeComment = (comment, userId) => {
  // have to name the keys as you define the keys of DB Model
  if(!comment || !userId) {
    console.log("comment or userId doesn't exist", comment, userId);
    return;
  }
  
  // TO DO - make createComment in dbfactory.js for comment Model
  // unique Id, CreateAt must be made in the function seperately
  // because it's the DB's role. in this part, it doesnt have to make it, it's not logical.

  createComment(comment, userId)
  
}


// modifyAllCommentsToBeShown
/* description: change all comments data to be shown with ease
cause somethine has to be modified and also there's datas that don't need to be sent
to client.
*/
export const modifyCommentsToBeShown = (userId) => {
  /* to define the form of comment to be sent to client and show it with ease
     some information need to be changed (populate)
     in order for the owner information in the comments to be turned into accountId,
     have to make function that can change the unique id into the information
     that has to be progressed in the "DB factory"
  */

  // First: get Comments based on userID
  if(!userId) userId = false;

  const comments = getComments(userId);

  // Second populate comments information to make view show them with ease.
  // To Do: make function (populateComments) in "dbfactory.js"
  //        you have to make the logic that changes owner in comment into User information.
  
  const result = populateComments(comments);
}