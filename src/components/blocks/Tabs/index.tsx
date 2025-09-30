import { Tabs as AntTabs } from "antd";
import { TabsProps } from "antd/lib/tabs";
import "./Tabs.css";

const Tabs: React.FC<TabsProps> = ({ children, ...rest }) => {
    return <AntTabs {...rest}>{children}</AntTabs>;
};

export default Tabs;
