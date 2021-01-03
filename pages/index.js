import { Divider } from "@blueprintjs/core";
import FlowChart from "../components/FlowChart";
import ToolBar from "../components/ToolBar";
import NodeMenu from "../components/NodeMenu";
import Forms from "../components/Forms";

export default () => {
  return (
    <div className="main">
      <div className="side-bar bp3-dark">
        <h3 className="bp3-heading">Settings</h3>
        <Divider />
        <Forms />
      </div>
      <div className="content">
        <ToolBar />
        <NodeMenu />
        <FlowChart />
      </div>
    </div>
  );
};
