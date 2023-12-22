import IconEnvelope from "@/assets/icons/IconEnvelope.vue";
import IconTelegram from "@/assets/icons/brand/IconTelegram.vue";
import { markRaw } from "vue";

const config = {
  navs: {
    top: [
      {
        key: "archive",
        path: "/archive",
      },
    ],
    bottom: [],
  },

  work: [],

  heroLinks: [
    {
      key: "email",
      path: "mailto:emrocode@gmail.com",
      icon: markRaw(IconEnvelope),
    },
    {
      key: "telegram",
      path: "https://t.me/emilioromz/",
      icon: markRaw(IconTelegram),
    },
  ],

  skills: {
    languages: ["js", "ts", "pug", "html", "css"],
    frameworks: ["nodejs", "next", "react", "vue", "tailwindcss"],
    tools: ["git", "github", "vscode", "vite", "vercel"],
    design: ["figma"],
  },

  connections: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/emrocode/",
    },
    {
      platform: "X(Twitter)",
      url: "https://x.com/emilioromz/",
    },
    {
      platform: "GitHub",
      url: "https://github.com/emrocode/",
    },
    {
      platform: "CodePen",
      url: "https://codepen.io/emrocode/",
    },
  ],
};

export default config;
