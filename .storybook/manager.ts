import { addons } from "storybook/manager-api";

import CustomTheme from "./CustomTheme.ts";

addons.setConfig({
  theme: CustomTheme,
  navSize: 300,
  bottomPanelHeight: 100,
  rightPanelWidth: 100,
  enableShortcuts: true,
  showToolbar: true,
  showPanel: false,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: true },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: true },
  },
});
