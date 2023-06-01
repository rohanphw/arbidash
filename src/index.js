import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { moonbaseAlpha } from "wagmi/chains";
import { ChakraProvider } from "@chakra-ui/react";

const chains = [moonbaseAlpha];
const client = createClient(
  getDefaultClient({
    appName: "Button",
    chains,
  })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="retro">
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </ChakraProvider>
);
