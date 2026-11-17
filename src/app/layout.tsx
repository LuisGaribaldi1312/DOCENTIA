import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DOCENTIA Red Educativa - Portal de Empleo Docente & Escuelas',
  description: 'Plataforma oficial y especializada en vacantes de empleo para maestros y profesores en escuelas públicas y privadas de todos los niveles educativos.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DOCENTIA'
  },
  applicationName: 'DOCENTIA',
  keywords: [
    'maestros', 'docentes', 'vacantes maestros', 'empleo escuelas', 'profesores',
    'bolsa de trabajo docente', 'interinatos', 'colegios privados', 'escuelas publicas'
  ]
};

export const viewport: Viewport = {
  themeColor: '#071626',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover'
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
      <body className="min-h-screen flex flex-col w-full overflow-x-hidden bg-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
