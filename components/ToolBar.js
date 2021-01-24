import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ElementsContext } from "../contexts/ElementsContext";
import { SocketContext } from "../contexts/SocketContext";
import { UIContext } from "../contexts/UIContext";
import { ModelContext } from "../contexts/ModelContext";
import { ToastIt } from "./ToastComp";
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
} from "@blueprintjs/core";

export default ({ mode, func }) => {
  const [created, setCreated] = useState(false);
  const [compiled, setCompiled] = useState(false);

  const socket = useContext(SocketContext);
  const { elements } = useContext(ElementsContext);
  const { setNode } = useContext(UIContext);
  const { compData, trainData, setLayers, setSelectedLayer } = useContext(
    ModelContext
  );
  const router = useRouter();

  const createModel = () => socket.emit("createModel", elements);

  const compileModel = () => {
    created
      ? socket.emit("compileModel", compData)
      : ToastIt("Model hasn't created yet", "danger");
  };

  const trainModel = () => {
    if (compiled) {
      socket.emit("trainModel", trainData);
      router.push("/train");
    } else {
      ToastIt("Model hasn't compiled yet", "danger");
    }
  };

  const handleCreateStatus = (status, message, layers) => {
    if (status) {
      setCreated(true);
      setLayers(layers);
      setSelectedLayer(layers[1]);
      setNode("compile");
      ToastIt("Model created successfully", "success");
    } else {
      setCreated(false);
      ToastIt(
        `Couldn't create model \n 
    ${message}`,
        "danger"
      );
    }
  };

  const handleCompileStatus = (status, message) => {
    if (status) {
      setCompiled(true);
      setNode("train");
      ToastIt("Model compiled successfully", "success");
    } else {
      setCompiled(false);
      ToastIt(
        `Couldn't compile model \n 
    ${message}`,
        "danger"
      );
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("create_status", ({ status, message, layers }) =>
        handleCreateStatus(status, message, layers)
      );

      socket.on("compaile_status", ({ status, message }) =>
        handleCompileStatus(status, message)
      );
    }
  }, [socket]);

  return (
    <div className="tool-bar">
      <Navbar className="bp3-dark">
        {mode == "train" ? (
          <NavbarGroup align={Alignment.LEFT}>
            <Button
              className={Classes.MINIMAL}
              icon="drag-handle-vertical"
              text="Layers"
              onClick={func}
            />
          </NavbarGroup>
        ) : (
          <NavbarGroup align={Alignment.LEFT}>
            <Button
              className={Classes.MINIMAL}
              icon="new-object"
              text="Create"
              onClick={createModel}
            />
            <Button
              className={Classes.MINIMAL}
              icon="cog"
              text="Compile"
              onClick={compileModel}
            />
            <Button
              className={Classes.MINIMAL}
              rightIcon="arrow-right"
              text="Train Model"
              onClick={trainModel}
            />
          </NavbarGroup>
        )}

        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="user" />
          <Button className="bp3-minimal" icon="notifications" />
          <Button className="bp3-minimal" icon="cog" />
        </Navbar.Group>
      </Navbar>
    </div>
  );
};
