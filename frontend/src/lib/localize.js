import i18n from '@/i18n';

// Veritabanından gelen içeriğin seçili dildeki hali: Türkçe seçiliyse "<alan>Tr" (ör. titleTr), yoksa asıl alan.
// Ders başlıkları (Topic.titleTr) ve AI konu kartları (titleTr, descriptionTr) için. Bileşen useTranslation
// kullandığı sürece dil değişince yeniden çizilir ve doğru hali gösterir.
export const localized = (item, field = 'title') => {
  if (!item) return undefined;
  if (i18n.language === 'tr' && item[`${field}Tr`]) return item[`${field}Tr`];
  return item[field];
};
