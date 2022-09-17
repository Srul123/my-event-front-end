export interface Local {
    code?: string,
    name?: string,
    countryCode?: string,
    dir?: string,
    side?: Side,
    device?: DeviceModes
}

export type DeviceModes = "mobile" | "tablet" | "desktop" | undefined;

export const devicesModes = {
    mobile: "mobile",
    tablet: "tablet",
    desktop: "desktop"
};

export const anchorSides = {
    left: "left",
    right: "right",
    bottom: "bottom",
    top: "top"
};

export type Side = "bottom" | "left" | "right" | "top" | undefined;

interface SupportedLanguages {
    he: string,
    en: string
};

export const supportedLanguages: SupportedLanguages = {
    he: "he",
    en: "en"
}

export const defaultLanguage: string = supportedLanguages.he;
export const defaultDirection: string = 'rtl';


export const languages: Local[] = [
    {
        code: supportedLanguages.he,
        name: 'עברית',
        countryCode: 'il',
        dir: 'rtl',
        side: "right"
    },
    {
        code: supportedLanguages.en,
        name: 'English',
        countryCode: 'gb',
        dir: "ltr",
        side: "left"
    },
];