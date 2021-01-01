import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from "@blueprintjs/core";

import { ToastIt } from "./ToastComp";

export default () => (
  <div className="tool-bar">
    <Navbar className="bp3-dark">
      <NavbarGroup align={Alignment.LEFT}>
        <Button className={Classes.MINIMAL} icon="new-object" text="Create" />
        <Button className={Classes.MINIMAL} icon="cog" text="Compile" />
        <Button
          className={Classes.MINIMAL}
          rightIcon="arrow-right"
          text="Train Model"
          onClick={() => ToastIt("Model is not compiled yet", "danger")}
        />
      </NavbarGroup>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp3-minimal" icon="user" />
        <Button className="bp3-minimal" icon="notifications" />
        <Button className="bp3-minimal" icon="cog" />
      </Navbar.Group>
    </Navbar>
  </div>
);
