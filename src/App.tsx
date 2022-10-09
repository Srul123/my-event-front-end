import React, { Suspense } from "react";
import AppViews from "./views/AppViews";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Spinner from "./components/layouts/spinner/Spinner";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import cookies from "js-cookie";
import {
  defaultLanguage,
  Local,
  languages,
  supportedLanguages,
  MuiThemeSupportedLocales,
} from "./interfaces/Locales";
import { useDispatch } from "react-redux";
import useWindowDimensionsService from "./services/windowScreenDimensions.service";
import { setLocalLanguage } from "./redux-modules/actions/appActions";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

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
      order: ["cookie", "htmlTag", "path", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguageCode = cookies.get("i18next") || defaultLanguage;
  const { width } = useWindowDimensionsService();
  const local: Local =
    languages.find((l) => l.code === currentLanguageCode) || languages[0];
  if (width <= 900) {
    local.device = "mobile";
  } else if (width > 900 && width < 1250) {
    local.device = "tablet";
  } else {
    local.device = "desktop";
  }
  const theme = useTheme();

  let cacheDirection = createCache({
    key: "muiltr",
    stylisPlugins: [() => {}, prefixer],
  });
  switch (currentLanguageCode) {
    case supportedLanguages.he: {
      local.muiThemeLocal = "heIL";
      theme.direction = "rtl";
      cacheDirection = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      });
      break;
    }
    case supportedLanguages.en: {
      local.muiThemeLocal = "enUS";
      theme.direction = "ltr";
      cacheDirection = createCache({
        key: "muiltr",
        stylisPlugins: [() => {}, prefixer],
      });
      break;
    }
    default: {
      local.muiThemeLocal = "heIL";
      break;
    }
  }

  React.useEffect(() => {
      dispatch(setLocalLanguage(local));
  }, [local]);

  const [muiThemeLocal, setMuiThemeLocal] =
    React.useState<MuiThemeSupportedLocales>(local.muiThemeLocal);

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[muiThemeLocal]),
    [muiThemeLocal, theme]
  );

  return (
    <Suspense fallback={<Spinner />}>
      <CacheProvider value={cacheDirection}>
        <ThemeProvider theme={themeWithLocale}>
          <AppViews setMuiThemeLocal={setMuiThemeLocal}  />
        </ThemeProvider>
      </CacheProvider>
    </Suspense>
  );
};

export default App;
