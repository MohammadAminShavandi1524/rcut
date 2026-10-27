import type { ApiCategory } from "./products.api";

import type { CategoryNode } from "./products.categories";

export function buildCategoryTree(categories: ApiCategory[]): CategoryNode[] {
  const nodes = new Map<number, CategoryNode>();

  const sorted = [...categories].sort(
    (a, b) => a.index - b.index || a.id - b.id,
  );

  for (const category of sorted) {
    nodes.set(category.id, {
      id: category.id,
      name: category.name,
      slug: category.name === "برند یاماسا" ? "yamasa" : undefined,
      children: [],
    });
  }

  const roots: CategoryNode[] = [];

  for (const category of sorted) {
    const node = nodes.get(category.id)!;

    const parent = category.parent ? nodes.get(category.parent.id) : undefined;

    if (parent && parent !== node) {
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export function findLiveCategoryById(
  id: number,
  tree: CategoryNode[],
): CategoryNode | undefined {
  for (const category of tree) {
    if (category.id === id) return category;

    const found = findLiveCategoryById(id, category.children ?? []);

    if (found) return found;
  }

  return undefined;
}

export function findLiveCategoryByKey(
  key: string,
  tree: CategoryNode[],
): CategoryNode | undefined {
  for (const category of tree) {
    if (String(category.id) === key || category.slug === key) {
      return category;
    }

    const found = findLiveCategoryByKey(key, category.children ?? []);

    if (found) return found;
  }

  return undefined;
}

export function getLiveCategoryPath(
  id: number,
  tree: CategoryNode[],
): CategoryNode[] {
  for (const category of tree) {
    if (category.id === id) {
      return [category];
    }

    const childrenPath = getLiveCategoryPath(id, category.children ?? []);

    if (childrenPath.length > 0) {
      return [category, ...childrenPath];
    }
  }

  return [];
}

export function getLiveLeafIds(category: CategoryNode): number[] {
  if (!category.children?.length) {
    return [category.id];
  }

  return category.children.flatMap(getLiveLeafIds);
}

export function matchesLiveCategoryFilter(
  productCategoryId: number,
  selectedIds: number[],
  tree: CategoryNode[],
): boolean {
  if (selectedIds.length === 0) return true;

  return selectedIds.some((id) => {
    const category = findLiveCategoryById(id, tree);

    return (
      category !== undefined &&
      getLiveLeafIds(category).includes(productCategoryId)
    );
  });
}
