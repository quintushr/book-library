import { Client, Account, Databases } from 'appwrite';

export default defineNuxtPlugin(() => {
  const config = {
    endpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NUXT_PUBLIC_APPWRITE_DATABASE_ID,
    collectionId: process.env.NUXT_PUBLIC_APPWRITE_COLLECTION_ID
  };
  console.log(config);
  const client = new Client();
  client.setEndpoint(config.endpoint).setProject(config.projectId);

  const account = new Account(client);
  const databases = new Databases(client);

  return {
    provide: {
      appwrite: {
        client,
        account,
        databases,
        config
      }
    }
  };
});