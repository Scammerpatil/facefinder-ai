import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconUsers,
  IconFileSearch,
  IconUpload,
  IconChecklist,
  IconBell,
  IconSettings,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Manage User Reports",
    path: "/admin/reports",
    icon: <IconChecklist width="24" height="24" />,
  },
  {
    title: "Detection Panel",
    path: "/admin/detection",
    icon: <IconFileSearch width="24" height="24" />,
  },
  {
    title: "Upload CCTV Footage",
    path: "/admin/upload-cctv",
    icon: <IconUpload width="24" height="24" />,
  },
  {
    title: "Matched Persons",
    path: "/admin/matches",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Notifications",
    path: "/admin/notifications",
    icon: <IconBell width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <IconSettings width="24" height="24" />,
  },
];
