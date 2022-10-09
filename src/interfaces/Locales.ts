export interface Local {
  code?: string;
  name?: string;
  countryCode?: string;
  dir?: string;
  side?: any;
  device?: DeviceModes;
  muiThemeLocal?: MuiThemeSupportedLocales;
}

export type MuiThemeSupportedLocales = "enUS" | "heIL";

export type DeviceModes = "mobile" | "tablet" | "desktop" | undefined;
export enum DeviceModesValues {
  mobile = "mobile",
  tablet = "tablet",
  desktop = "mobile",
}

export enum devicesModes {
  mobile = "mobile",
  tablet = "tablet",
  desktop = "desktop",
}

export enum anchorSides {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
  top = "top",
  bottom = "bottom",
}

export type Side =
  | "right"
  | "left"
  | "up"
  | "down"
  | "top"
  | "bottom"
  | undefined;

interface SupportedLanguages {
  he: string;
  en: string;
}

export enum supportedLanguages {
  he = "he",
  en = "en",
}

export const defaultLanguage = supportedLanguages.he;
export const defaultDirection = "rtl";

export const languages: Local[] = [
  {
    code: supportedLanguages.he,
    name: "עברית",
    countryCode: "il",
    dir: "rtl",
    side: "right",
    muiThemeLocal: "heIL",
  },
  {
    code: supportedLanguages.en,
    name: "English",
    countryCode: "gb",
    dir: "ltr",
    side: "left",
    muiThemeLocal: "enUS",
  },
];
