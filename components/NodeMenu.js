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
  const convLayer = (
    <Menu>
      <MenuItem text="Conv1D" />
      <MenuItem text="Conv2D" />
      <MenuItem text="Conv3D" />
      <MenuItem text="SeperableConv1D" />
      <MenuItem text="SeperableConv2D" />
    </Menu>
  );
  const poolingLayer = (
    <Menu>
      <MenuItem text="AveragePooling2D" />
      <MenuItem text="MaxPool2D" />
      <MenuItem text="GlobalAveragePooling2D" />
      <MenuItem text="GlobalMaxPooling2D" />
    </Menu>
  );
  const dropoutLayer = (
    <Menu>
      <MenuItem text="Dropout" />
      <MenuItem text="SpartialDropout2D" />
      <MenuItem text="GaussianDropout" />
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
          <Button className={Classes.MINIMAL} text="Dropout Layers" />
        </Popover>
        <Popover content={convLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="Convoltional Layers" />
        </Popover>
        <Popover content={poolingLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="Pooling Layers" />
        </Popover>
        <Popover content={dropoutLayer} position={Position.BOTTOM}>
          <Button className={Classes.MINIMAL} text="Dropout Layers" />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};
