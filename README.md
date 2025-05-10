# 📱 AppMob - Your Smart Inventory Manager

AppMob is a powerful mobile application designed to help you manage your inventory efficiently. With features like item categorization, quantity tracking, and multi-language support, it's the perfect tool for keeping your items organized.

## 🌟 Features

- 📦 **Smart Inventory Management**
  - Add, edit, and remove items
  - Track quantities in real-time
  - Categorize items with custom tags
  - Quick quantity adjustments

- 🌍 **Multi-language Support**
  - English
  - Portuguese
  - Spanish

- 🎨 **User-friendly Interface**
  - Clean and intuitive design
  - Easy navigation
  - Responsive layout
  - Beautiful animations

- 🔄 **Coming Soon**
  - Shopping list management
  - Category-based organization
  - Inventory synchronization

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/appMob.git
   cd appMob
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

### Running the App

You can run the app in several ways:

- **Expo Go**: Scan the QR code with the Expo Go app on your device
- **Android Emulator**: Press 'a' in the terminal after starting the server
- **iOS Simulator**: Press 'i' in the terminal after starting the server (macOS only)
- **Web**: Press 'w' in the terminal after starting the server

### Building for Production

To create an APK for Android:

```bash
eas build --platform android --local --profile preview
```

The APK will be generated in the `android/app/build/outputs/apk/release/` directory.

## 🛠️ Development

### Project Structure

```
appMob/
├── app/              # Main application code
├── components/       # Reusable components
├── hooks/           # Custom hooks
├── store/           # State management
├── src/
│   ├── i18n/        # Internationalization
│   └── constants/   # App constants
└── assets/          # Images, fonts, etc.
```

### Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run linter

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or suggestions, please open an issue in the repository.
