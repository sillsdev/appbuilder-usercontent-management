import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

let fallback = 'en';

register('en', () => import('./locales/en.json'));

init({
    initialLocale: getLocaleFromNavigator(),
    fallbackLocale: fallback
});
