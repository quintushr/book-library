# 📚 Book Scanner

Une application web moderne et responsive pour scanner les codes-barres de livres, récupérer les informations des livres et constituer votre bibliothèque personnelle.

## ✨ Fonctionnalités

- **Scan de codes-barres** : Scannez les codes-barres des livres avec la caméra de votre appareil
- **Informations sur les livres** : Récupérez des informations détaillées via l'API Google Books
- **Bibliothèque personnelle** : Enregistrez les livres dans votre bibliothèque personnelle
- **Design responsive** : Fonctionne sur ordinateur, tablette et mobile
- **Interface moderne** : Interface propre et minimaliste avec Tailwind CSS

## 🛠️ Technologies

- **[Nuxt.js 3](https://nuxt.com/)** : Framework Vue.js pour construire des applications web modernes
- **[Tailwind CSS](https://tailwindcss.com/)** : Framework CSS utilitaire
- **[Vue Barcode Reader](https://www.npmjs.com/package/vue-barcode-reader)** : Bibliothèque de scan de codes-barres
- **[Appwrite](https://appwrite.io/)** : Backend as a Service pour l'authentification et la base de données
- **[nuxt-appwrite](https://github.com/appwrite/sdk-for-nuxt)** : Module Nuxt officiel pour Appwrite
- **[Google Books API](https://developers.google.com/books)** : Récupération d'informations sur les livres

## 🚀 Mise en route

### Prérequis

- Node.js (v16 ou ultérieur)
- npm ou yarn
- Compte Appwrite

### Configuration d'Appwrite

1. Créez un projet Appwrite
   - Allez sur [cloud.appwrite.io](https://cloud.appwrite.io)
   - Créez un compte ou connectez-vous
   - Créez un nouveau projet

2. Créez une base de données
   - Dans votre projet, allez dans "Databases"
   - Créez une nouvelle base de données (notez l'ID de la base de données)

3. Créez une collection avec les attributs suivants :
   - `title` (string)
   - `authors` (string[])
   - `description` (string)
   - `publishedDate` (string)
   - `thumbnail` (string)
   - `isbn` (string)

4. Configurez les permissions de lecture/écriture pour votre collection
   - Allez dans l'onglet "Settings" de votre collection
   - Configurez les permissions appropriées (par exemple, permettre la lecture et l'écriture pour tous)

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
NUXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_PUBLIC_APPWRITE_PROJECT_ID=votre-project-id
NUXT_PUBLIC_APPWRITE_DATABASE_ID=votre-database-id
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=votre-collection-id
```

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 📱 Utilisation

1. Autorisez l'accès à la caméra lorsque vous y êtes invité
2. Positionnez le code-barres d'un livre dans le champ de vision de la caméra
3. Une fois scanné, les informations du livre s'afficheront
4. Cliquez sur "Ajouter à la bibliothèque" pour enregistrer le livre dans votre collection
5. Consultez tous vos livres enregistrés dans la section "Ma bibliothèque"

## 🚀 Déploiement

### Déploiement avec Nixpacks

Ce projet est configuré pour être déployé avec Nixpacks, qui crée automatiquement des images Docker optimisées.

1. Assurez-vous d'avoir Nixpacks installé :
   ```bash
   curl -sSL https://nixpacks.com/install.sh | bash
   ```

2. Construisez votre application avec Nixpacks :
   ```bash
   nixpacks build . --name book-scanner
   ```

3. Exécutez l'image construite :
   ```bash
   docker run -p 3000:3000 book-scanner
   ```

### Variables d'environnement pour la production

Assurez-vous de définir les variables d'environnement suivantes dans votre environnement de production :

```
NODE_ENV=production
NUXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_PUBLIC_APPWRITE_PROJECT_ID=votre-project-id
NUXT_PUBLIC_APPWRITE_DATABASE_ID=votre-database-id
NUXT_PUBLIC_APPWRITE_COLLECTION_ID=votre-collection-id
```

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- [Google Books API](https://developers.google.com/books) pour les données sur les livres
- [Appwrite](https://appwrite.io/) pour les services backend
- [Nuxt.js](https://nuxt.com/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour les utilitaires de style