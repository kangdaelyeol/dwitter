

// function Name: makeComment
// description: to take 2 param(commentValue: String, userID(StringId)

import { createUniqueId } from "./factory"

// andthen make the comment data and put it in DB
export const makeComment = (comment, userId) => {
  // have to name the keys as you define the keys of DB Model
  const userComment = {
    content: comment,
    owner: userId
  }

  // TO DO - make createContent in dbfactory.js for comment Model
  // unique Id, CreateAt must be made in the function seperately
  // because it's the DB's role. in this part, it doesnt have to make it, it's not logical.
  
  createContent({
    ...userComment
  })

}