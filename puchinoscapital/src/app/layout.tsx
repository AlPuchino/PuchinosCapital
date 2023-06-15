'use client';
import './globals.css'
import Navbar from '@/components/Navbar'
import { DynamicContextProvider, SortWallets } from '@dynamic-labs/sdk-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({

  children,
} : {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          appLogoUrl:
            'https://raw.githubusercontent.com/AlPuchino/PuchinosCapitalData/main/PuchinosLogo.png',
          appName: 'Puchinos Capital',
          environmentId: 'd7349082-d115-4c9a-bad8-08fd7f80d9cf',
          walletsFilter: SortWallets(['phantomevm', 'metamask', 'walletconnect', 'coinbase']),
          defaultNumberOfWalletsToShow: 4,
          newToWeb3WalletChainMap: {
            primary_chain: "evm", 
            wallets: {
                evm: "phantomevm",
                solana: "phantom"
            }
          }
        }}>
        <body>
          <ToastContainer 
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme='dark'
          />
          <Navbar />
          {children}
        </body>
      </DynamicContextProvider>
    </html>
  )
}