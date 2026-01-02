"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function SidebarWrapper({ children }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-white z-10">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

