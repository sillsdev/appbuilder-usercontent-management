import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

let fallback = 'en';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('fr', () => import('./locales/fr.json'));

init({
    initialLocale: getLocaleFromNavigator(),
    fallbackLocale: fallback
});
