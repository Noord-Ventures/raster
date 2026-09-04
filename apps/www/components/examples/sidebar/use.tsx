import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="sidebar">
      <h3 className="rs-use-type">Rail</h3>
      <div className="rs-use-body">
        <Sidebar aria-label="Studio rail">
          <SidebarHead>Raster</SidebarHead>
          <SidebarNav aria-label="Studio links">
            <SidebarLabel>Go to</SidebarLabel>
            <SidebarItem href="/" current>Overview</SidebarItem>
            <SidebarItem href="/docs">Docs</SidebarItem>
            <SidebarItem href="/components">Components</SidebarItem>
          </SidebarNav>
          <SidebarFoot>0.3</SidebarFoot>
        </Sidebar>
      </div>
    </UseField>
  );
}
