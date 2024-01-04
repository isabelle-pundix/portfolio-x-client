import { WalletAddress } from "../state/walletAddress/walletAddressSlice";

export const FullWalletAddressNameGenerator = (walletAddresses: WalletAddress[]) => {
  // const user = useAppSelector(selectUser);
  let userAddresses: WalletAddress[] = [];
  walletAddresses.forEach((address: any) => {
    userAddresses.push(address);
  });
  return userAddresses;
};

export const ShortWalletAddressNameGenerator = (walletAddresses: WalletAddress[]) => {
    const userAddressKVP = FullWalletAddressNameGenerator(walletAddresses);
    let userAddressesKVPShortened: WalletAddress[] = userAddressKVP.map(
        (address) => {
          const walletAddressShort = `${address.walletAddress
            .substring(
            0,
            5
          )}...${address.walletAddress.substring(
            address.walletAddress.length - 5
          )
        }`;
          return {...address, walletAddress: walletAddressShort}
        }
      );
      return userAddressesKVPShortened;
}