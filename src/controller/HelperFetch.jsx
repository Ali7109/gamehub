import {  addDoc, arrayUnion, doc, orderBy, serverTimestamp,updateDoc } from "firebase/firestore"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
// Add a discussion to the specified game's discussionList subcollection
export async function createBlog(db, user, title, content){
  const blogCollectionRef = collection(db, "blogs");
  const userDocRef = await addDoc(blogCollectionRef, {
    name:user.displayName,
    email: user.email, 
    userId: user.uid,
    content,
    title,
    timestamp: serverTimestamp(),
  })
}

// Fetch discussions for a specific game and sort by timestamp
export async function fetchBlogs() {
  const blogsRef = collection(db, "blogs");

  const q = query(blogsRef, orderBy("timestamp", "desc"));

  const blogsSnapshot = await getDocs(q);

  const blogs = [];
  
  blogsSnapshot.forEach((blog) => {
    let curr = blog._document.data.value.mapValue.fields
    console.log(curr)
    blogs.push({
      userId: curr.userId.stringValue,
      name: curr.name.stringValue,
      email: curr.email.stringValue,
      id: curr.id.stringValue,
      timestamp: curr.timestamp.timestampValue,
      title: curr.title.stringValue,
      content: curr.content.stringValue
    })
  });

  return blogs;
}



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
    profPhotoUrl: '../../images/StockImages/stockProfPic.jpg',
    coverPhoto:  '../../images/StockImages/stockCoverPic.jpg'
  })


}

export async function getUserById(db, userId) {
  const userCollectionRef = collection(db, "users");
  const userQuery = query(userCollectionRef, where("id", "==", userId));

  const userQuerySnapshot = await getDocs(userQuery);
  if (userQuerySnapshot.size === 0) {
    // No user found with the given ID
    return null;
  }

  // Assuming there's only one user with the given ID (or you can handle multiple results)
  const userData = userQuerySnapshot.docs[0].data();
  return userData;
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


