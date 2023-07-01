import './globals.css'
// import { DynamicContextProvider, SortWallets } from '@dynamic-labs/sdk-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({
  // modal,
  children,
} : {
  children: React.ReactNode
  // modal: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
      {/* <DynamicContextProvider
        settings={{
          environmentId: 'd7349082-d115-4c9a-bad8-08fd7f80d9cf',
          appLogoUrl: 'https://raw.githubusercontent.com/AlPuchino/PuchinosCapitalData/main/PuchinosLogo.png',
          appName: 'Puchinos Capital',
          walletsFilter: SortWallets(['phantomevm', 'metamask', 'walletconnect', 'coinbase']),
          defaultNumberOfWalletsToShow: 4,
          newToWeb3WalletChainMap: {
            primary_chain: "evm", 
            wallets: {
                solana: "phantom"
            }
          }
        }}> */}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme='dark'
          />
          {/* {modal} */}
          {children}
      {/* </DynamicContextProvider> */}
        </body>
    </html>
  )
}