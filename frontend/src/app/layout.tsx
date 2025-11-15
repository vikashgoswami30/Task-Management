import './globals.css'
import ClientOnly from '../components/ClientOnly'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Task Manager',
  description: 'Simple Task Manager Application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <Navbar />
        </ClientOnly>

        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}
