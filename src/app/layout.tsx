import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DOCENTIA - Portal de Empleo para Maestros y Escuelas',
  description: 'Plataforma oficial y especializada en vacantes de empleo para maestros y profesores en escuelas públicas y privadas de todos los niveles educativos.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DOCENTIA'
  },
  applicationName: 'DOCENTIA',
  keywords: [
    'maestros', 'docentes', 'vacantes maestros', 'empleo escuelas', 'profesores',
    'bolsa de trabajo docente', 'interinatos', 'colegios privados', 'escuelas publicas'
  ]
};

export const viewport: Viewport = {
  themeColor: '#0266c8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen flex flex-col pb-16 md:pb-0">
        {children}
      </body>
    </html>
  );
}
