# 📚 Book Scanner

A modern, responsive web application for scanning book barcodes, retrieving book information, and building your personal library.

![Book Scanner App](https://i.imgur.com/placeholder.jpg)

## ✨ Features

- **Barcode Scanning**: Scan book barcodes using your device's camera
- **Book Information**: Retrieve detailed book information from Google Books API
- **Personal Library**: Save books to your personal library
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalist interface with Tailwind CSS

## 🛠️ Technologies

- **[Nuxt.js 3](https://nuxt.com/)**: Vue.js framework for building modern web applications
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Vue Barcode Reader](https://www.npmjs.com/package/vue-barcode-reader)**: Barcode scanning library
- **[Appwrite](https://appwrite.io/)**: Backend as a Service for authentication and database
- **[Google Books API](https://developers.google.com/books)**: Book information retrieval

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Appwrite account

### Setup Appwrite

1. Create an Appwrite project
2. Create a database
3. Create a collection with the following attributes:
   - `title` (string)
   - `authors` (string[])
   - `description` (string)
   - `publishedDate` (string)
   - `thumbnail` (string)
   - `isbn` (string)
4. Set appropriate read/write permissions for your collection

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NUXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NUXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=your-collection-id
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

1. Allow camera access when prompted
2. Position a book's barcode within the camera view
3. Once scanned, book information will be displayed
4. Click "Add to Library" to save the book to your personal collection
5. View all your saved books in the "My Library" section

## 🚀 Deployment

### Deploying with Nixpacks

This project is configured to be deployed using Nixpacks, which automatically creates optimized Docker images.

1. Make sure you have Nixpacks installed:
   ```bash
   curl -sSL https://nixpacks.com/install.sh | bash
   ```

2. Build your application with Nixpacks:
   ```bash
   nixpacks build . --name book-scanner
   ```

3. Run the built image:
   ```bash
   docker run -p 3000:3000 book-scanner
   ```

### Environment Variables for Production

Make sure to set the following environment variables in your production environment:

```
NODE_ENV=production
NUXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NUXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=your-collection-id
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Google Books API](https://developers.google.com/books) for providing book data
- [Appwrite](https://appwrite.io/) for backend services
- [Nuxt.js](https://nuxt.com/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities