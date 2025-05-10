import { useTranslation } from 'react-i18next';

export type Tag = {
  id: string;
  en: string;
  es: string;
  pt: string;
  color: string;
};

const TAGS: Tag[] = [
  {
    id: 'freezer',
    en: 'Freezer',
    es: 'Congelador',
    pt: 'Congelador',
    color: '#0074D9',
  },
  {
    id: 'fruits_vegetables',
    en: 'Fruits & Vegetables',
    es: 'Frutas y Verduras',
    pt: 'Fruta e Legumes',
    color: '#2ECC40',
  },
  {
    id: 'dairy',
    en: 'Dairy',
    es: 'Lácteos',
    pt: 'Frios',
    color: '#FFDC00',
  },
  {
    id: 'grocery',
    en: 'Grocery',
    es: 'Mercería',
    pt: 'Mercearia',
    color: '#4ECDC4',
  },
  {
    id: 'beverages',
    en: 'Beverages',
    es: 'Bebidas',
    pt: 'Bebidas',
    color: '#FF4136',
  },
  {
    id: 'spices',
    en: 'Spices',
    es: 'Especias',
    pt: 'Especiarias',
    color: '#B10DC9',
  },
  {
    id: 'hygiene',
    en: 'Hygiene',
    es: 'Higiene',
    pt: 'Higiene',
    color: '#45B7D1',
  },
  {
    id: 'cleaning',
    en: 'Cleaning',
    es: 'Limpieza',
    pt: 'Limpeza',
    color: '#FF6B6B',
  },
  {
    id: 'others',
    en: 'Others',
    es: 'Otros',
    pt: 'Outros',
    color: '#AAAAAA',
  },
];

export function useTags() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getTagLabel = (tagId: string) => {
    const tag = TAGS.find((t) => t.id === tagId);
    if (!tag) return tagId;
    return tag[currentLanguage as keyof Omit<Tag, 'id' | 'color'>] || tag.en;
  };

  const getTagColor = (tagId: string) => {
    const tag = TAGS.find((t) => t.id === tagId);
    return tag?.color || '#4ECDC4';
  };

  const getAllTags = () => {
    return TAGS.map((tag) => ({
      id: tag.id,
      label: tag[currentLanguage as keyof Omit<Tag, 'id' | 'color'>] || tag.en,
      color: tag.color,
    }));
  };

  return {
    getTagLabel,
    getTagColor,
    getAllTags,
    tags: TAGS,
  };
} 