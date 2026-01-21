import React from 'react';

export const metadata = {
  title: 'Nidoostys',
  description: 'Estructura inicial para el App Router de Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}