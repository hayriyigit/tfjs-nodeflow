import "../style/app.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { ElementsProvider } from "../contexts/ElementsContext";
import { ModelProvider } from "../contexts/ModelContext";
import { UIProvider } from "../contexts/UIContext";

export default ({ Component, pageProps }) => (
  <ElementsProvider>
    <ModelProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </ModelProvider>
  </ElementsProvider>
);
