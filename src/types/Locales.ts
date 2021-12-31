export interface Language {
    code: string,
    name: string,
    countryCode: string,
    dir?: string
}

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

export const languages: Language[] = [
    {
        code: supportedLanguages.he,
        name: 'עברית',
        countryCode: 'il',
        dir: 'rtl'
    },
    {
        code: supportedLanguages.en,
        name: 'English',
        countryCode: 'gb',
        dir: "ltr"
    },
];