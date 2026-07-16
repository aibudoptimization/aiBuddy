/** Shared stroke icons for automation / pipeline UIs (24×24 viewBox). */
export const WORKFLOW_ICONS = {
  lead: ["M12 6a3 3 0 1 0 .01 0", "M6 19c0-3.6 12-3.6 12 0"],
  branch: ["M4 12h6", "M10 12l8-6", "M10 12l8 6"],
  clock: ["M12 4a8 8 0 1 0 .01 0", "M12 8v4l3 2"],
  mail: ["M3 6.5h18v11H3z", "M3 7l9 6 9-6"],
  chat: [
    "M4 5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 0-1z",
  ],
  calendar: ["M5 6h14v14H5z", "M5 10h14", "M9 4v3", "M15 4v3"],
  search: ["M11 5a6 6 0 1 0 .01 0", "M20 20l-4.5-4.5"],
  shield: ["M12 4l7 3v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7z"],
  shieldalert: ["M12 4l7 3v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7z", "M12 9.5v3.4"],
  lock: ["M6 11h12v9H6z", "M8 11V8a4 4 0 0 1 8 0v3"],
  bell: [
    "M12 4a5 5 0 0 0-5 5v3l-1.5 2.5h13L17 12V9a5 5 0 0 0-5-5z",
    "M10 18a2 2 0 0 0 4 0",
  ],
  list: ["M4 6h3.5v3.5H4z", "M4 14.5h3.5v3.5H4z", "M11 7.5h9", "M11 16h9"],
  tag: ["M4 4h7l9 9-7 7-9-9z", "M8 8h.01"],
  check: ["M4.5 12.5l4.5 4.5 10.5-11"],
  briefcase: ["M3 8h18v11H3z", "M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
  invoice: ["M7 3h7l4 4v14H7z", "M14 3v4h4", "M9.5 12h5", "M9.5 15.5h3"],
  card: ["M3 6.5h18v11H3z", "M3 10.5h18"],
} as const;

export type WorkflowIconKey = keyof typeof WORKFLOW_ICONS;
