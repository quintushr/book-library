<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">
        📚 Book Scanner
      </h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Scanner Section -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span class="text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </span>
            Scan Book Barcode
          </h2>
          <div class="aspect-video bg-gray-50 rounded-xl overflow-hidden ring-1 ring-gray-200">
            <ClientOnly>
              <StreamBarcodeReader
                @decode="onDecode"
                @loaded="onLoaded"
              ></StreamBarcodeReader>
              <template #fallback>
                <div class="flex items-center justify-center h-64 text-gray-400">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p class="mt-2">Loading camera...</p>
                  </div>
                </div>
              </template>
            </ClientOnly>
          </div>
          <p class="text-sm text-gray-500 mt-3 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Position the barcode within the camera view
          </p>
        </div>

        <!-- Book Info Section -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span class="text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            Book Information
          </h2>
          <div v-if="loading" class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
          <div v-else-if="error" class="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-xl p-4">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="mt-2">{{ error }}</p>
            </div>
          </div>
          <div v-else-if="book" class="space-y-6">
            <div class="flex justify-center">
              <img
                v-if="book.thumbnail"
                :src="book.thumbnail"
                :alt="book.title"
                class="h-48 object-contain rounded-lg shadow-sm"
              />
            </div>
            <div class="text-center">
              <h3 class="font-medium text-2xl text-gray-900">{{ book.title }}</h3>
              <p class="text-indigo-600 mt-1">{{ book.authors?.join(', ') }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
              <div class="text-sm">
                <p class="text-gray-500">ISBN</p>
                <p class="font-medium text-gray-900">{{ book.isbn }}</p>
              </div>
              <div class="text-sm">
                <p class="text-gray-500">Published</p>
                <p class="font-medium text-gray-900">{{ book.publishedDate }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">{{ book.description }}</p>
            
            <!-- Add to Library Button -->
            <button
              @click="addToLibrary"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              :disabled="saving"
            >
              <svg
                v-if="!saving"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div v-else class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              {{ saving ? 'Adding to Library...' : 'Add to Library' }}
            </button>
          </div>
          <div v-else class="flex items-center justify-center h-64 text-gray-400 bg-gray-50 rounded-xl">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p class="mt-2">Scan a book to see details</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Library Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span class="text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </span>
          My Library
        </h2>
        
        <div v-if="loadingLibrary" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
        
        <div v-else-if="library.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-lg">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No books yet</h3>
          <p class="mt-1 text-sm text-gray-500">Start by scanning a book to add it to your library.</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="book in library"
            :key="book.$id"
            class="bg-white rounded-xl shadow-md overflow-hidden flex"
          >
            <img
              v-if="book.thumbnail"
              :src="book.thumbnail"
              :alt="book.title"
              class="w-1/3 object-cover"
            />
            <div class="p-4 flex-1">
              <h3 class="font-medium text-gray-900">{{ book.title }}</h3>
              <p class="text-sm text-indigo-600">{{ book.authors?.join(', ') }}</p>
              <p class="text-xs text-gray-500 mt-2">ISBN: {{ book.isbn }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $appwrite } = useNuxtApp()

const loading = ref(false)
const saving = ref(false)
const loadingLibrary = ref(true)
const error = ref(null)
const book = ref(null)
const library = ref([])

async function fetchLibrary() {
  try {
    loadingLibrary.value = true
    const response = await $appwrite.databases.listDocuments(
      $appwrite.config.databaseId,
      $appwrite.config.collectionId
    )
    library.value = response.documents
  } catch (err) {
    console.error('Error fetching library:', err)
  } finally {
    loadingLibrary.value = false
  }
}

async function addToLibrary() {
  if (!book.value) return

  try {
    saving.value = true
    await $appwrite.databases.createDocument(
      $appwrite.config.databaseId,
      $appwrite.config.collectionId,
      'unique()',
      book.value
    )
    await fetchLibrary()
  } catch (err) {
    console.error('Error adding book to library:', err)
  } finally {
    saving.value = false
  }
}

async function fetchBookInfo(isbn) {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      const bookData = data.items[0].volumeInfo
      book.value = {
        title: bookData.title,
        authors: bookData.authors,
        description: bookData.description,
        publishedDate: bookData.publishedDate,
        thumbnail: bookData.imageLinks?.thumbnail,
        isbn: isbn
      }
    } else {
      error.value = 'Book not found'
    }
  } catch (err) {
    error.value = 'Error fetching book information'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function onDecode(result) {
  fetchBookInfo(result)
}

function onLoaded() {
  console.log('Scanner is ready')
}

onMounted(() => {
  fetchLibrary()
})
</script>

<style>
.decode-result {
  word-break: break-all;
}
</style>