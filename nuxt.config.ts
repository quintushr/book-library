// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'Book Scanner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  // Définir les variables d'environnement publiques
  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
      appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID || '',
      appwriteDatabaseId: process.env.NUXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      appwriteCollectionId: process.env.NUXT_PUBLIC_APPWRITE_COLLECTION_ID || ''
    }
  },
  // Configuration pour éviter les erreurs SSR avec les modules client-only
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  // Optimisation pour les imports
  vite: {
    optimizeDeps: {
      include: ['appwrite']
    },
    // Résoudre les problèmes d'importation SSR
    ssr: {
      noExternal: ['appwrite']
    },
    // Forcer le rechargement des dépendances
    cacheDir: '.nuxt/.vite'
  }
})