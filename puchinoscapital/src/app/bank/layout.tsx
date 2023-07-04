'use client'
import React from 'react';
import SideMenu from '@/components/SidebarMenu'
import { ToastContainer } from 'react-toastify'
import { DynamicContextProvider, SortWallets } from '@dynamic-labs/sdk-react'

export default function Layout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div>
      <DynamicContextProvider
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
        }}>
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
        <div className='bank-container'>
          <SideMenu />
          {props.modal}
          {props.children}
        </div>
      </DynamicContextProvider>
    </div>
  )
}

