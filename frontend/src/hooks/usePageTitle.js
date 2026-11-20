import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Tarayıcı sekmesinde ve arama sonuçlarında görünen sayfa başlığı: "<başlık> – learnenglish".
// title boşsa (ana sayfa veya veri henüz yüklenmediyse) genel başlık kullanılır. Dil değişince güncellenir.
export default function usePageTitle(title) {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = title ? `${title} – learnenglish` : `learnenglish – ${t('Learn English Online')}`;
  }, [title, t]);
}
