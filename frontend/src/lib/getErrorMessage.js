export const getErrorMessage = (error) =>
  error?.data?.message || 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
