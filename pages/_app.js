import "../style/app.css";
import "../style/bootstrap.min.css";
import { ElementsProvider } from "../contexts/ElementsContext";

export default ({ Component, pageProps }) => (
  <ElementsProvider>
    <Component {...pageProps} />
  </ElementsProvider>
);
