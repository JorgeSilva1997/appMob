# 📱 AppMob - Your Smart Inventory Manager

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://github.com/pmndrs/zustand)
[![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)](https://www.i18next.com/)

AppMob is a powerful mobile application designed to help you manage your inventory efficiently. With features like item categorization, quantity tracking, multi-language support, and smart shopping lists, it's the perfect tool for keeping your items organized.

## Topics

- 📱 Mobile Development
- ⚛️ React Native
- 🚀 Expo
- 📦 State Management
- 🌍 Internationalization
- 🎨 UI/UX Design
- 📊 Data Organization
- 🔄 Real-time Updates
- 📝 TypeScript
- 🛠️ Development Tools
- 📱 Cross-platform
- 🎯 Performance
- 🔒 Local Storage
- 📱 Native Features
- 🎨 Custom Components
- 📱 Responsive Design
- 🔄 Animations
- 📱 Gesture Handling
- 🎯 Error Handling
- 📱 User Experience

## 🌟 Features

- 📦 **Smart Inventory Management**
  - Add, edit, and remove items
  - Track quantities in real-time
  - Categorize items with custom tags
  - Quick quantity adjustments
  - Beautiful item cards with animations

- 🛒 **Smart Shopping List**
  - Create and manage shopping lists
  - Group items by categories
  - Check/uncheck items
  - Move items to bottom of list
  - Clear all items with one tap
  - Duplicate item prevention

- 🌍 **Multi-language Support**
  - English
  - Portuguese
  - Spanish

- 🎨 **User-friendly Interface**
  - Clean and intuitive design
  - Easy navigation
  - Responsive layout
  - Beautiful animations
  - Floating Action Button (FAB) with smooth animations
  - Error handling with user-friendly modals

- 🔄 **Coming Soon**
  - Inventory synchronization
  - Cloud backup
  - Search functionality in inventory list
  - Shopping list sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- EAS CLI (`npm install -g eas-cli`)

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

1. Make sure you have EAS CLI installed:
   ```bash
   npm install -g eas-cli
   ```

2. Create your own EAS project:
   ```bash
   eas init
   ```
   This will create a new project ID for your build.

3. Update the `app.json` file:
   - Replace the existing `projectId` in the `eas` section with your new project ID
   - Update the `package` name in the `android` section if needed
   - Update the `scheme` if needed

4. Build the APK:
   ```bash
   eas build --platform android --local --profile preview
   ```

The APK will be generated in the `android/app/build/outputs/apk/release/` directory.

> **Important Note**: The `projectId` in the repository's `app.json` is specific to the original project. You must create your own EAS project and update the `projectId` before building. This is a security measure to prevent unauthorized access to the original project's build resources.

## 🛠️ Development

### Project Structure

```
appMob/
├── app/                    # Main application code
│   ├── (tabs)/            # Tab-based screens
│   └── modals/            # Modal screens
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── modals/           # Modal components
├── hooks/                # Custom hooks
│   ├── useGroupedInventory.ts
│   ├── useGroupedListShop.ts
│   └── useTags.ts
├── store/                # State management
│   ├── useInventoryStore.ts
│   └── useListShopStore.ts
├── src/
│   ├── i18n/            # Internationalization
│   └── constants/       # App constants
└── assets/              # Images, fonts, etc.
```

### Key Technologies

- React Native
- Expo
- Zustand (State Management)
- i18next (Internationalization)
- React Navigation
- TypeScript

### Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run linter
- `eas build` - Build for production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or suggestions, please open an issue in the repository.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community for the great ecosystem
- All contributors who help improve this project
