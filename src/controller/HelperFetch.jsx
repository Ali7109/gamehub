import {
	addDoc,
	arrayUnion,
	doc,
	orderBy,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../Firebase/Firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Add a discussion to the specified game's discussionList subcollection
export async function createBlog(user, title, content) {
	try {
		const blogCollectionRef = collection(db, "blogs");
		const userDocRef = await addDoc(blogCollectionRef, {
			name: user.displayName,
			email: user.email,
			userId: user.uid,
			id: uuidv4(),
			content,
			title,
			timestamp: serverTimestamp(),
		});

		return true; // Blog was successfully added
	} catch (error) {
		console.error("Error creating blog:", error);
		return false; // Blog creation failed
	}
}
export async function fetchBlogById(blogId) {
	const blogRef = collection(db, "blogs");
	const userQuery = query(blogRef, where("id", "==", blogId));

	const userQuerySnapshot = await getDocs(userQuery);
	if (userQuerySnapshot.size === 0) {
		// No user found with the given ID
		return null;
	}
	// Assuming there's only one user with the given ID (or you can handle multiple results)
	const userData = userQuerySnapshot.docs[0].data();
	return userData;
}
// Fetch discussions for a specific game and sort by timestamp
export async function fetchBlogs() {
	const blogsRef = collection(db, "blogs");

	const q = query(blogsRef, orderBy("timestamp", "desc"));

	const blogsSnapshot = await getDocs(q);

	const blogs = [];

	blogsSnapshot.forEach((blog) => {
		let curr = blog._document.data.value.mapValue.fields;
		console.log(blog);
		blogs.push({
			userId: curr.userId.stringValue,
			name: curr.name.stringValue,
			email: curr.email.stringValue,
			id: curr.id.stringValue,
			timestamp: curr.timestamp.timestampValue,
			title: curr.title.stringValue,
			content: curr.content.stringValue,
		});
	});

	return blogs;
}

export async function addDiscussion(db, gameId, content, userId, userName) {
	const gameDocRef = doc(db, "discussions", "" + gameId);
	const discussionListRef = collection(gameDocRef, "discussionList");

	try {
		await addDoc(discussionListRef, {
			content,
			userId,
			userName,
			timestamp: serverTimestamp(),
			replies: [],
		});
	} catch (error) {
		console.log("whoops" + error);
	}
}

export async function addUser(db, user) {
	try {
		const userCollectionRef = collection(db, "users");
		await addDoc(userCollectionRef, {
			displayName: user.displayName,
			email: user.email,
			id: user.uid,
			profPhotoUrl: null,
			coverPhoto: null,
		});
	} catch (error) {
		console.error("Error adding user:", error);
		throw error;
	}
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

export async function userExists(db, userId) {
	const userCollectionRef = collection(db, "users");
	const snap_query = query(userCollectionRef, where("id", "==", userId));
	const snapshot = await getDocs(snap_query);
	console.log(snapshot.empty);
	return !snapshot.empty;
}

// Function to update user's profile picture URL
export async function updateUserProfilePic(userId, uploadedPicUrl) {
	// Ensure userId and uploadedPicUrl are valid
	if (!userId || !uploadedPicUrl) {
		console.error(
			"Invalid userId or uploadedPicUrl:",
			userId,
			uploadedPicUrl
		);
		return;
	}

	try {
		// Get a reference to the "users" collection
		const userCollectionRef = collection(db, "users");

		// Query to find the user by userId
		const userQuery = query(userCollectionRef, where("id", "==", userId));

		// Get the query snapshot
		const querySnapshot = await getDocs(userQuery);

		if (querySnapshot.empty) {
			console.error("User not found.");
			return;
		}

		// Get the first document (assuming userId is unique)
		const userDoc = querySnapshot.docs[0]; // User document

		// Update the profile picture URL in the user's document
		await updateDoc(userDoc.ref, {
			profPhotoUrl: uploadedPicUrl,
		});

		console.log("Profile picture updated successfully");
	} catch (error) {
		console.error("Error updating profile picture:", error);
	}
}

export async function addReply(
	db,
	gameId,
	discussionId,
	content,
	userId,
	userName
) {
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

export const getImageByName = async (folderName, imageName) => {
	try {
		const imageRef = ref(storage, `${folderName}/${imageName}`);
		const url = await getDownloadURL(imageRef);
		return url;
	} catch (error) {
		console.error("Error fetching image:", error);
		throw error;
	}
};

export const uploadImage = async (file, userId, fileName) => {
	const newFileName = `${userId}_${fileName}`;

	const imageRef = ref(storage, `profiles/profile-pics/${newFileName}`);

	try {
		// Upload the file
		const snapshot = await uploadBytes(imageRef, file);
		console.log("Uploaded a file!", snapshot);

		// Get the download URL after successful upload
		// await getDownloadURL(snapshot.ref);
		// console.log("File available at", downloadURL);

		// Return the URL for further use (e.g., updating the user's profilePicUrl)
		return newFileName;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
};
