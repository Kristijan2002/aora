import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '67b8bba7003303e9a1a6',
    databaseId: '67b8bd3800366a5617a5',
    userCollectionId: '67b8bd6a0020b3983ea5',
    videoCollectionId: '67b8bd9b0022494b9954',
    storageId: '67b8bf150005c2cf0e9a'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId) 
    .setPlatform(config.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string,
password: string,
username: string
): Promise<any> => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password)

        const newUser = await  databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser; 
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export async function signIn(email: string, password: string) {
    try{
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch(error: any){
        throw new Error(error)
    }
}

export const getCurrentUser: any = async () => {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
         
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        ) 

        if(!currentUser) throw Error;

        return currentUser.documents[0]
    }catch(error){
        console.log(error)
    }
}