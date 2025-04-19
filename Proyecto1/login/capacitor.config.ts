import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pps.login.app',
  appName: 'PPSLogin',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos
      launchAutoHide: true, // Se ocultará automáticamente después del tiempo especificado
      androidSplashResourceName: 'splash', // Nombre del recurso de imagen para Android
      //iosSplashResourceName: 'Default', // Nombre del recurso de imagen para iOS
      showSpinner: false, // Muestra un spinner de carga
      splashFullScreen: false,
      splashImmersive: false,
      androidScaleType: "CENTER_CROP",
      backgroundColor: "#282828", // YOUR SPLASH SCREEN MAIN COLOR
    }
  }
};

export default config;
