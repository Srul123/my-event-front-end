import React, {Suspense} from 'react';
import AppViews from "./views/AppViews";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Spinner from "./components/layouts/spinner/Spinner";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import cookies from "js-cookie";
import {defaultLanguage, Local, languages, supportedLanguages} from "./interfaces/Locales";
import {useDispatch} from "react-redux";
import useWindowDimensionsService from "./services/windowScreenDimensions.service";
import {setLocalLanguage} from "./redux-modules/actions/appActions";


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
    const dispatch = useDispatch();
    const currentLanguageCode = cookies.get('i18next') || defaultLanguage;
    const {width} = useWindowDimensionsService();
    const local: Local = languages.find(l => l.code === currentLanguageCode) || languages[0];
    if (width <= 900) {
        local.device = "mobile";
    } else if (width > 900 && width < 1250) {
        local.device = "tablet";
    } else {
        local.device = "desktop";
    }
    dispatch(setLocalLanguage(local));
    const themeLTR = createTheme({
        direction: 'ltr',
    });
    let themeRTL = createTheme({
        direction: 'rtl',
    });



    return (
        <Suspense fallback={<Spinner/>}>
            <ThemeProvider theme={currentLanguageCode === defaultLanguage ? themeRTL : themeLTR}>
                <AppViews/>
            </ThemeProvider>
        </Suspense>
    );
}


export default App;
