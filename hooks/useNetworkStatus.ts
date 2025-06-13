// // import * as Network from 'expo-network';
// import { useEffect, useState } from 'react';

// export function useNetworkStatus() {
//   const [isConnected, setIsConnected] = useState(true);
//   const checkNetwork = async () => {
//     const state = await Network.getNetworkStateAsync();
//     setIsConnected(!!state.isConnected && !!state.isInternetReachable);
//   };

//   useEffect(() => {
    
//     checkNetwork();

//     // Optionally, poll every few seconds
//     const interval = setInterval(checkNetwork, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return isConnected;
// }