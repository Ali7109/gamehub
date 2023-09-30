import {  addDoc, arrayUnion, doc, orderBy, serverTimestamp,updateDoc } from "firebase/firestore"; 
import { collection, query, where, getDocs } from "firebase/firestore";

// Add a discussion to the specified game's discussionList subcollection

export async function addDiscussion(db, gameId, content, userId, userName) {
  const gameDocRef = doc(db, "discussions", ""+ gameId);
  const discussionListRef = collection(gameDocRef, "discussionList");
  
  await addDoc(discussionListRef, {
    content,
    userId,
    userName,
    timestamp: serverTimestamp(),
    replies: []
  });
}

//Adding users
export async function addUser(db, user){
  const userCollectionRef = collection(db, "users");
  const userDocRef = await addDoc(userCollectionRef, {
    displayName: user.displayName,
    email: user.email,
    id: user.uid,
    profPhotoUrl: '/src/frontend-view/images/StockImages/stockProfPic.jpg',
    coverPhoto:  '/src/frontend-view/images/StockImages/stockCoverPic.jpg'
  })

  console.log(userDocRef)

}

export async function userExists(db, userId){
  const userCollectionRef = collection(db, "users");
  const snap_query = query(userCollectionRef, where("userId","==",userId ));
  const snapshot = await getDocs(snap_query);
  console.log(snapshot.empty)
  return !snapshot.empty;
}



export async function addReply(db, gameId, discussionId, content, userId, userName) {
  
  const gameDocRef = doc(db, "discussions", "" + gameId);
  const discussionRef = doc(gameDocRef, "discussionList", discussionId);
  const timestamp = new Date(); // Generate timestamp on the client side
  
  // Update the discussion document to add a reply using arrayUnion
  await updateDoc(discussionRef, {
    replies: arrayUnion({ content, userId, userName, timestamp }),
  });
}

// Fetch discussions for a specific game and sort by timestamp
export async function fetchDiscussions(db, gameId) {
  const gameDocRef = doc(db, "discussions", "" + gameId);
  const discussionListRef = collection(gameDocRef, "discussionList");

  const q = query(discussionListRef, orderBy("timestamp", "desc"));

  const discussionSnapshot = await getDocs(q);

  const discussions = [];
  discussionSnapshot.forEach((doc) => {
    discussions.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return discussions;
}


