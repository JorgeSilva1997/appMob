import 'dotenv/config';

export default () => ({
  expo: {
    /* ─────────────────── Basic app info ─────────────────── */
    name: 'stock-it',
    slug: 'stock-it',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'withfirebasesamllogin',
    icon: './assets/images/back.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    /* ─────────────────── iOS config ─────────────────── */
    ios: {
      supportsTablet: true,
    },

    /* ─────────────────── Android config ─────────────────── */
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/back.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.jorgesilva1997.withfirebasesamllogin',
    },

    /* ─────────────────── Web config ─────────────────── */
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/back.png',
    },

    /* ─────────────────── Plugins ─────────────────── */
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/back.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-localization',
    ],

    /* ─────────────────── Experiments ─────────────────── */
    experiments: {
      typedRoutes: true,
    },

    /* ─────────────────── Extra (env + EAS) ─────────────────── */
    extra: {
      router: {},
      eas: {
        projectId: '611b261e-e509-4a21-9c36-8f63d618164d',
      },
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_DATABASE: process.env.FIREBASE_DATABASE,
    },
  },
});
