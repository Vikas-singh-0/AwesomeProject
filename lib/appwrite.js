import { Account, Client, ID } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.vikas.aura",
  projectId: "662f66b6000061e1c5c8",
  databaseId: "662f6833002de3e45804",
  userCollectionId: "662f690600043d56b316",
  videoCollectionId: "662f6833002de3e45804",
  storageId: "662f6b72002bdc85e2aa",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = (uname, email, pass) => {
  // Register User
  account.create(ID.unique(), email, pass, uname).then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
