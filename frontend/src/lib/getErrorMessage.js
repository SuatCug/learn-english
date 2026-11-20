import i18n from '@/i18n';

// Backend mesajı seçili dilde gelir (Accept-Language); gelmezse genel bir mesaj gösterilir.
export const getErrorMessage = (error) =>
  error?.data?.message || i18n.t('Something went wrong. Please try again.');
