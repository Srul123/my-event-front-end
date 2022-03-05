export interface LanguageInterface {
    code: string,
    name: string,
    countryCode: string,
    dir?: string,
    side:  "bottom" | "left" | "right" | "top" | undefined
}

interface SupportedLanguagesInterface {
  he: string,
  en: string
};

export const supportedLanguages: SupportedLanguagesInterface = {
    he: "he",
    en: "en"
}

export const defaultLanguage: string = supportedLanguages.he;
export const defaultDirection: string = 'rtl';



export const languages: LanguageInterface[] = [
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