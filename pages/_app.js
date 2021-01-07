import "../style/app.css";
import "../style/trainpage.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { ElementsProvider } from "../contexts/ElementsContext";
import { ModelProvider } from "../contexts/ModelContext";
import { UIProvider } from "../contexts/UIContext";
import { SocketProvider } from "../contexts/SocketContext";

export default ({ Component, pageProps }) => (
  <ElementsProvider>
    <ModelProvider>
      <UIProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </UIProvider>
    </ModelProvider>
  </ElementsProvider>
);
