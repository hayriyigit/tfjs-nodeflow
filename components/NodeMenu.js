import { useContext } from "react";
import { ElementsContext } from "../contexts/ElementsContext";
import NodeElements from "../node-elements/";
import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  Navbar,
  NavbarGroup,
  Alignment,
  Classes,
} from "@blueprintjs/core";

export default () => {
  const { addElement } = useContext(ElementsContext);

  const addNode = (e) => {
    const newElement = NodeElements(e.target.innerText);
    addElement(newElement);
  };
  const convLayer = (
    <Menu>
      <MenuItem text="Conv2D" onClick={addNode} />
      <MenuItem text="SepConv2D" onClick={addNode} />
    </Menu>
  );
  const poolingLayer = (
    <Menu>
      <MenuItem text="AvgPooling2D" onClick={addNode} />
      <MenuItem text="MaxPool2D" onClick={addNode} />
      <MenuItem text="GlobalAveragePooling2D" />
      <MenuItem text="GlobalMaxPooling2D" />
    </Menu>
  );
  const dropoutLayer = (
    <Menu>
      <MenuItem text="Dropout" onClick={addNode} />
      <MenuItem text="BatchNorm" onClick={addNode} />
    </Menu>
  );

  const primLayer = (
    <Menu>
      <MenuItem text="Dense" onClick={addNode} />
      <MenuItem text="Flatten" onClick={addNode} />
      <MenuItem text="Concatenate" onClick={addNode} />
    </Menu>
  );
  return (
    <Navbar>
      <NavbarGroup align={Alignment.CENTER}>
        <Popover content={convLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="Convoltional Layers" />
        </Popover>
        <Popover content={poolingLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="Pooling Layers" />
        </Popover>
        <Popover content={dropoutLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="Regularizers" />
        </Popover>
        <Popover content={primLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="NN Layers" />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};
