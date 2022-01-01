import React, {Suspense} from 'react';
import {Provider} from "react-redux";
// import store from "./redux/store";
import AppViews from "./views/_app-views";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Spinner from "./components/layouts/spinner/Spinner";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import cookies from "js-cookie";
import {defaultLanguage, supportedLanguages} from "./types/Locales";


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        // lng: html? html.lang : 'en',
        supportedLngs: [supportedLanguages.he, supportedLanguages.en],
        fallbackLng: defaultLanguage,
        detection: {
            // order and from where user language should be detected
            // options ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain']
            order: ['cookie', 'htmlTag', 'path', 'localStorage', 'subdomain'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });


function App() {
    const currentLanguageCode = cookies.get('i18next') || defaultLanguage;

    const themeLTR = createTheme({
        direction: 'ltr',
    });

    let themeRTL = createTheme({
        direction: 'rtl',
    });

    console.log(currentLanguageCode);
    return (
        <Suspense fallback={<Spinner/>}>
            <ThemeProvider theme={currentLanguageCode === defaultLanguage ? themeRTL : themeLTR}>
                <AppViews/>
            </ThemeProvider>
        </Suspense>
    );
}


export default App;
