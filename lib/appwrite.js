import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.vikas.aura",
  projectId: "662f66b6000061e1c5c8",
  databaseId: "662f6833002de3e45804",
  userCollectionId: "662f690600043d56b316",
  videoCollectionId: "662f693500216b456067",
  storageId: "662f6b72002bdc85e2aa",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatar = new Avatars(client);
const storage = new Storage(client);
const databases = new Databases(client);

export const createUser = async (uname, email, pass) => {
  // Register User
  try {
    const newAccount = await account.create(ID.unique(), email, pass, uname);
    if (!newAccount) throw Error;
    const avatarUrl = avatar.getInitials(uname);

    await signIn(email, pass);

    const newUser = databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: uname,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export async function signIn(email, pass) {
  console.log("gg");
  try {
    const session = await account.createEmailSession(email, pass);
    console.log(session);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);
    if (!currentAccount) {
      throw Error;
    }
    const promise = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      Query.equal("accountId", currentAccount.$id)
    );
    if (!promise) throw Error;
    return promise.documents[0];
  } catch (error) {
    throw Error(error.message);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId
    );
    console.log(posts);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      videoCollectionId,
      [Query.orderDesc("$createAt", Query.limit(7))]
    );
    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      videoCollectionId,
      [Query.search("title", query)]
    );
    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      videoCollectionId,
      [Query.equal("creator", userId)]
    );
    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if(type === 'video') {
      fileUrl = await storage.getFileView(appWriteConfig.storageId, fileId)
    } else if(type === 'image') {
      fileUrl = await storage.getFilePreview(appWriteConfig.storageId, fileId, 2000, 2000, 'top', 100)
    } else{ 
      throw new Error('Invalid file type')
    }
    return fileUrl;
  } catch (error) {
    console.log(error);
    return Alert.alert('eror in preview');
  }
}

export const uploadFile = async (file, type) => {
  if(!file) {
    return
  }
  const {mimeType, ...rest} = file;
  const asset = { type: mimeType, ...rest };
  try {
    const uploadedFile = await storage.createFile(appWriteConfig.storageId, ID.unique(), asset );
    console.log(uploadedFile);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    return Alert.alert('error in upload');
  }
}

export const createVideo = async (form) => {
try {
  const [thumbnailUri, videoUri] = await Promise.all([
    uploadFile(form.thumbnail, 'image'),
    uploadFile(form.video, 'video')
  ]);
  console.log({
    title: form.title,
    video: form.video,
    thumbnail: form.thumbnail,
    prompt: form.prompt,
    creator: form.userId 
  });
  const newPost = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, ID.unique(), {
    title: form.title,
    video: videoUri,
    thumbnail: thumbnailUri,
    prompt: form.prompt,
    // creator: form.userId 
  });
  return newPost;
} catch (error) {
  throw new Error(error); 
}
}