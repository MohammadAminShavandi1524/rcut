export type CategoryNode = {
  id: number;
  name: string;
  slug?: string;
  children?: CategoryNode[];
};

export const categoryTree: CategoryNode[] = [
  {
    id: 1,
    name: "اینسرت",
    slug: "diamond",
    children: [
      {
        id: 11,
        name: "اینسرت تراشکاری",
        children: [
          { id: 13, name: "DNMG" },
          { id: 14, name: "CNMG" },
          { id: 15, name: "VBMT" },
          { id: 16, name: "DCMT" },
        ],
      },
      {
        id: 12,
        name: "اینسرت فرز",
        children: [
          { id: 19, name: "TPK" },
          { id: 17, name: "NAPKT" },
          { id: 18, name: "SPKN" },
          { id: 22, name: "LNMU" },
        ],
      },
      { id: 23, name: "اینسرت دنده‌زنی" },
      { id: 24, name: "اینسرت جوشی" },
    ],
  },
  {
    id: 2,
    name: "هولدر",
    slug: "holders",
    children: [
      { id: 20, name: "داخل تراش" },
      { id: 21, name: "رو تراش" },
      { id: 25, name: "برش" },
      { id: 26, name: "پیشونی تراش" },
      { id: 27, name: "کف تراش" },
    ],
  },
  {
    id: 3,
    name: "فرز انگشتی",
    slug: "end-mills",
    children: [
      { id: 31, name: "فرز انگشتی چهار پر" },
      { id: 32, name: "فرز انگشتی بالنوز" },
      { id: 33, name: "فرز انگشتی تمام الماس" },
      { id: 34, name: "فرز انگشتی دو پر" },
      { id: 35, name: "فرز انگشتی تیپ" },
    ],
  },
  {
    id: 4,
    name: "مته",
    slug: "drills",
    children: [
      { id: 36, name: "مته HSS" },
      { id: 37, name: "مته کبالت" },
      { id: 38, name: "مته ته کونیک" },
      { id: 39, name: "مته تمام الماس" },
      { id: 40, name: "مته بلند" },
    ],
  },
  {
    id: 5,
    name: "قلاویز",
    slug: "taps",
    children: [
      { id: 41, name: "قلاویز ماشینی" },
      { id: 42, name: "قلاویز دستی" },
      { id: 43, name: "قلاویز اینچ" },
    ],
  },
  {
    id: 6,
    name: "لوازم اندازه‌گیری",
    slug: "measuring",
    children: [
      { id: 44, name: "کولیس" },
      { id: 45, name: "میکرومتر" },
      { id: 46, name: "ساعت اندیکاتور" },
      { id: 47, name: "ساعت شیطونکی" },
      { id: 48, name: "پایه ساعت" },
    ],
  },
  {
    id: 7,
    name: "برند یاماسا",
    slug: "yamasa",
    children: [
      { id: 49, name: "رولربرنشینگ" },
      { id: 50, name: "ساچمه" },
      { id: 51, name: "کاورمیل" },
      { id: 52, name: "کندنباله رولر برنشینگ" },
    ],
  },
];

export function findCategoryById(
  id: number,
  categories: CategoryNode[] = categoryTree,
): CategoryNode | undefined {
  for (const category of categories) {
    if (category.id === id) return category;

    const child = findCategoryById(id, category.children ?? []);

    if (child) return child;
  }

  return undefined;
}

export function findCategoryByKey(
  key: string,
  categories: CategoryNode[] = categoryTree,
): CategoryNode | undefined {
  for (const category of categories) {
    if (String(category.id) === key || category.slug === key) {
      return category;
    }

    const child = findCategoryByKey(key, category.children ?? []);

    if (child) return child;
  }

  return undefined;
}

export function getCategoryPath(
  id: number,
  categories: CategoryNode[] = categoryTree,
): CategoryNode[] {
  for (const category of categories) {
    if (category.id === id) {
      return [category];
    }

    const childPath = getCategoryPath(id, category.children ?? []);

    if (childPath.length > 0) {
      return [category, ...childPath];
    }
  }

  return [];
}

export function getLeafCategoryIds(category: CategoryNode): number[] {
  if (!category.children?.length) {
    return [category.id];
  }

  return category.children.flatMap(getLeafCategoryIds);
}

export function matchesCategoryFilter(
  productCategoryId: number,
  selectedCategoryIds: number[],
): boolean {
  if (selectedCategoryIds.length === 0) {
    return true;
  }

  return selectedCategoryIds.some((id) => {
    const category = findCategoryById(id);

    return (
      category !== undefined &&
      getLeafCategoryIds(category).includes(productCategoryId)
    );
  });
}

export const staticProductLeafIds: Record<string, number[]> = {
  الماس: [13, 14, 15, 16, 19, 17, 18, 22, 23, 24],
  هولدر: [20, 21, 25, 26, 27],
  "فرز انگشتی": [31, 32, 33, 34, 35],
  مته: [36, 37, 38, 39, 40],
  قلاویز: [41, 42, 43],
  اندازه‌گیری: [44, 45, 46, 47, 48],
};
