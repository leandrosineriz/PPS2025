import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pps.login.app',
  appName: 'PPS Login',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos
      //launchAutoHide: true, // Se ocultará automáticamente después del tiempo especificado
      androidSplashResourceName: 'Default', // Nombre del recurso de imagen para Android
      //iosSplashResourceName: 'Default', // Nombre del recurso de imagen para iOS
      showSpinner: false, // Muestra un spinner de carga
      //splashFullScreen: true,
      //splashImmersive: true,
    }
  }
};

export default config;
