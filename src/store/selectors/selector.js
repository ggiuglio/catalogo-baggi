export const getProducts = state => state.filterdProducts.sort((a, b) => (a.id > b.id) ? 1 : -1).slice(0, 100);
export const getProductsNumber = state => state.filterdProducts.length;
export const getUser = state => state.user;
export const getLoginError = state => state.loginError;
export const getProductFilters = state => state.productFilters;
export const isLoading = state => state.loading;
export const getImportResults = state => state.importResults;
export const getProductToDelete = state => state.productToDelete;
export const getProductToEdit = state => state.productToEdit;