import { useTags } from '@/hooks/useTags';
import { ListShopItem, useListShopStore } from '@/store/useListShopStore';

export interface GroupedSection {
  title: string;
  data: ListShopItem[];
}

export function useGroupedListShop() {
  const items = useListShopStore((state) => state.items);
  const { getAllTags } = useTags();

  // Get all tags in the current language
  const tags = getAllTags();

  // Group items by tag
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.tag]) {
      acc[item.tag] = [];
    }
    acc[item.tag].push(item);
    return acc;
  }, {} as Record<string, ListShopItem[]>);

  // Create sections array with headers and items, using the tag order from getAllTags
  const sections = tags.map(tag => ({
    title: tag.label,
    data: groupedItems[tag.id] || [],
  }));

  return {
    sections,
    items,
  };
} 