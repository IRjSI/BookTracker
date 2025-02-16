const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL).trim(),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}

// Validate URL format
if (!conf.appwriteURL.startsWith('http://') && !conf.appwriteURL.startsWith('https://')) {
    throw new Error('Invalid Appwrite URL format. URL must start with http:// or https://')
}

export default conf