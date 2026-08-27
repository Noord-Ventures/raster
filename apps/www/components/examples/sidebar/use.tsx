import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="sidebar">
      <h3 className="rs-use-type">Rail</h3>
      <div className="rs-use-body">
        <Sidebar>
          <SidebarHead>Raster</SidebarHead>
          <SidebarNav>
            <SidebarLabel>Go to</SidebarLabel>
            <SidebarItem href="/" current>Overview</SidebarItem>
            <SidebarItem href="/docs">Docs</SidebarItem>
            <SidebarItem href="/components">Components</SidebarItem>
          </SidebarNav>
          <SidebarFoot>0.3</SidebarFoot>
        </Sidebar>
      </div>
    </article>
  );
}
