import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"; 

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

// export async function addReply(db, gameId, discussionId, content, userId, userName) {
//   const gameDocRef = doc(db, "discussions", "" + gameId);
//   const discussionRef = doc(gameDocRef.collection("discussionList"), discussionId);
  
//   // Update the discussion document to add a reply using arrayUnion
//   await updateDoc(discussionRef, {
//     replies: arrayUnion({ content, userId, userName, timestamp: serverTimestamp() }),
//   });
// }

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


// // Fetch discussions for a specific game
// export async function fetchDiscussions(db, gameId) {
//   const gameDocRef = doc(db, "discussions", ""+ gameId);
//   const discussionListRef = collection(gameDocRef, "discussionList");
  
//   const discussionSnapshot = await getDocs(discussionListRef);
  
//   const discussions = [];
//   discussionSnapshot.forEach((doc) => {
//     discussions.push({
//       id: doc.id,
//       ...doc.data()
//     });
//   });

//   return discussions;
// }
