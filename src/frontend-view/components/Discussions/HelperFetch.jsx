import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 

// Add a discussion to the specified game's discussionList subcollection

export async function addDiscussion(db, gameId, content, userId, userName) {
  const gameDocRef = doc(db, "discussions", ""+ gameId);
  const discussionListRef = collection(gameDocRef, "discussionList");
  
  await addDoc(discussionListRef, {
    content,
    userId,
    userName,
    timestamp: serverTimestamp()
  });
}

// Fetch discussions for a specific game
export async function fetchDiscussions(db, gameId) {
  const gameDocRef = doc(db, "discussions", ""+ gameId);
  const discussionListRef = collection(gameDocRef, "discussionList");
  
  const discussionSnapshot = await getDocs(discussionListRef);
  
  const discussions = [];
  discussionSnapshot.forEach((doc) => {
    discussions.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return discussions;
}
