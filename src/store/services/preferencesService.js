export default {
  updatePreference(store, name, value) {
    store.dispatch(`preferences/set`, {name, value});
  },
};

// Использование:
// import preferencesService from '@store/services/preferencesService'
// changeLanguage(newLanguage) {
//   preferencesService.updatePreference(store, 'language', newLanguage);
// },
