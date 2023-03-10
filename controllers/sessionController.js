import { getUserById } from "./dbfactory.js"

/**function: renewUserInfo
 * description: if something is changed in DB, session information also has to be renewed.
 * for instance, when the comments DB is changed, created or deleted
 * , the information that's renewed is changed in the DB ,but for the session, it hasn't corresponded.
 */
export const renewUserInfo = (userId, session) => {
  const user = getUserById(userId);
  if(!user) session.destroy();
  else {
    session.user = user;
  }
  return;
}