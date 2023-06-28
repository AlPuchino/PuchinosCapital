import { SystemProgram, Transaction, PublicKey, Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDynamicContext } from '@dynamic-labs/sdk-react'; 

const MySendButton = () => {
  const connection = new Connection("https://maximum-wild-cloud.solana-mainnet.discover.quiknode.pro/23e472715f752adf4c286795dc3f1c299ecd284d/", "confirmed");
  const { primaryWallet } = useDynamicContext();
  const { sendTransaction } = useWallet();

  const handlePayment = async () => {
    try {
      if (primaryWallet !== null) {
        const addressPromise = primaryWallet?.connector.getSigner();
        const address = await addressPromise;
  
        if (typeof address === 'object' && address !== null && 'publicKey' in address) {
          const publicKey = address.publicKey as PublicKey;
          const signer = await primaryWallet?.connector.getWeb3Provider();
          console.log("ADDRESS PUBLIC KEY", publicKey);
          console.log("SIGNER", signer);

          const fromPubkey = publicKey;
          const toPublicKey = new PublicKey("AHiVeE85J8CWH4Kjgosje7DbBbtvoBtvNuvoMgtWUr3b");
          const amount = 1 * 1000000000;

          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: fromPubkey,
              toPubkey: toPublicKey,
              lamports: amount,
            })
          );

          console.log("Transaction before signing:", transaction);

          const signedTransaction = await sendTransaction(transaction, connection)
          .then ((signedTransaction) => {
            console.log("Signed Transaction:", signedTransaction);
          }
          )
        }


      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handlePayment}>Send</button>
  );
}

export default MySendButton;