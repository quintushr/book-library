import { Client, Account, Databases, ID } from 'appwrite';

// Définition des types pour une meilleure maintenabilité
interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  databaseId: string;
  collectionId: string;
}

// Service Appwrite pour centraliser la logique
class AppwriteService {
  client: Client;
  account: Account;
  databases: Databases;
  config: AppwriteConfig;

  constructor(config: AppwriteConfig) {
    this.config = config;

    // Initialisation du client
    this.client = new Client();
    this.client.setEndpoint(this.config.endpoint);
    
    if (this.config.projectId) {
      this.client.setProject(this.config.projectId);
    } else {
      console.warn('Appwrite Project ID is not set. Please check your environment variables.');
    }

    // Initialisation des services
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // Méthodes pour la gestion des livres
  async getBooks() {
    try {
      if (!this.isConfigured()) {
        throw new Error('Appwrite is not fully configured');
      }
      
      const response = await this.databases.listDocuments(
        this.config.databaseId,
        this.config.collectionId
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async addBook(bookData) {
    try {
      if (!this.isConfigured()) {
        throw new Error('Appwrite is not fully configured');
      }
      
      return await this.databases.createDocument(
        this.config.databaseId,
        this.config.collectionId,
        ID.unique(),
        bookData
      );
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  // Méthodes pour l'authentification (préparation pour l'ajout futur)
  async createAccount(email, password, name) {
    try {
      return await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // L'utilisateur n'est pas connecté
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  // Vérifier si la configuration est valide
  isConfigured() {
    return Boolean(
      this.config.projectId && 
      this.config.databaseId && 
      this.config.collectionId
    );
  }
}

// Plugin client-only
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  
  const appwriteConfig = {
    endpoint: config.appwriteEndpoint,
    projectId: config.appwriteProjectId,
    databaseId: config.appwriteDatabaseId,
    collectionId: config.appwriteCollectionId
  };
  
  const appwriteService = new AppwriteService(appwriteConfig);
  
  return {
    provide: {
      appwrite: appwriteService
    }
  };
});