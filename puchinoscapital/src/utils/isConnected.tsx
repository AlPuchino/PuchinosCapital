import { useDynamicContext } from '@dynamic-labs/sdk-react';

const IsConnected = () => {
    const { primaryWallet, user } = useDynamicContext();

    if (primaryWallet && user) {
        console.log(primaryWallet);
        return primaryWallet && user;
    }
}

export default IsConnected;