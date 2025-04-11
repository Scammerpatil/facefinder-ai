import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconUserPlus,
  IconSearch,
  IconClipboardText,
  IconBellRinging,
  IconUser,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Report Missing Person",
    path: "/user/report",
    icon: <IconUserPlus width="24" height="24" />,
  },
  {
    title: "Check Match Status",
    path: "/user/status",
    icon: <IconSearch width="24" height="24" />,
  },
  {
    title: "Submitted Reports",
    path: "/user/reports",
    icon: <IconClipboardText width="24" height="24" />,
  },
  {
    title: "Notifications",
    path: "/user/notifications",
    icon: <IconBellRinging width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <IconUser width="24" height="24" />,
  },
];
