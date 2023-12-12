import IconEnvelope from "@/assets/icons/IconEnvelope.vue";
import IconTelegram from "@/assets/icons/brand/IconTelegram.vue";
import IconFolder from "@/assets/icons/IconFolder.vue";
import { markRaw } from "vue";

const config = {
  title: "Emilio Romero",
  description:
    "Front-end developer, I combine creativity and technical skills to create innovative solutions.",

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
      path: "/#contact",
      icon: markRaw(IconEnvelope),
    },
    {
      key: "archive",
      path: "/archive",
      icon: markRaw(IconFolder),
    },
  ],

  contactLinks: [
    {
      platform: "Telegram",
      user: "t.me/emilioromz",
      icon: markRaw(IconTelegram),
      url: "https://t.me/emilioromz/",
    },
    {
      platform: "Email",
      user: "to:emrocode",
      icon: markRaw(IconEnvelope),
      url: "mailto:emrocode@gmail.com",
    },
  ],

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
