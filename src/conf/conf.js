const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL).trim(),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}

export default conf