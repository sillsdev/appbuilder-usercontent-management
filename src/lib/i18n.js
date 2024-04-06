import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

let fallback = 'en';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

init({
    initialLocale: getLocaleFromNavigator(),
    fallbackLocale: fallback
});
