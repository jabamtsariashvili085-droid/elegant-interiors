export interface Product {
  id: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
  material: string;
  color: string;
}

export const categories = [
  {
    id: 'tables',
    subcategories: ['kitchenTable', 'studyTable', 'computerTable', 'tvTable'],
  },
  {
    id: 'livingRoom',
    subcategories: ['sofa', 'hallwayWardrobe', 'shoeCommode', 'mirror'],
  },
  {
    id: 'bedroom',
    subcategories: ['wardrobe', 'bed', 'commode', 'nightstand', 'dresser'],
  },
  {
    id: 'other',
    subcategories: ['pouf', 'chair', 'shelf'],
  },
];

export const sampleProducts: Product[] = [
  {
    id: '1',
    nameKa: 'სკანდინავიური თანამედროვე დივანი',
    nameEn: 'Scandinavian Modern Sofa',
    nameRu: 'Скандинавский современный диван',
    category: 'livingRoom',
    subcategory: 'sofa',
    price: 899.99,
    oldPrice: 1100,
    image: '/images/product-1.jpg',
    rating: 5,
    inStock: true,
    material: 'Velvet',
    color: 'green',
  },
  {
    id: '2',
    nameKa: 'მინიმალისტური ხის მაგიდა',
    nameEn: 'Minimalist Wood Table',
    nameRu: 'Минималистичный деревянный стол',
    category: 'tables',
    subcategory: 'kitchenTable',
    price: 450,
    image: '/images/product-2.jpg',
    rating: 4,
    inStock: true,
    material: 'Wood',
    color: 'brown',
  },
  {
    id: '3',
    nameKa: 'Mid-Century სავარძელი',
    nameEn: 'Mid-Century Armchair',
    nameRu: 'Кресло Mid-Century',
    category: 'livingRoom',
    subcategory: 'sofa',
    price: 320,
    oldPrice: 400,
    image: '/images/product-3.jpg',
    rating: 5,
    inStock: true,
    material: 'Wood',
    color: 'gray',
  },
  {
    id: '4',
    nameKa: 'ტანსაცმლის კარადა',
    nameEn: 'Wardrobe Cabinet',
    nameRu: 'Шкаф для одежды',
    category: 'bedroom',
    subcategory: 'wardrobe',
    price: 700,
    oldPrice: 800,
    image: '/images/product-4.jpg',
    rating: 4,
    inStock: true,
    material: 'Wood',
    color: 'white',
  },
  {
    id: '5',
    nameKa: 'სამეცადინო მაგიდა',
    nameEn: 'Study Desk',
    nameRu: 'Письменный стол',
    category: 'tables',
    subcategory: 'studyTable',
    price: 330,
    oldPrice: 350,
    image: '/images/product-5.jpg',
    rating: 4,
    inStock: true,
    material: 'Wood',
    color: 'brown',
  },
  {
    id: '6',
    nameKa: 'თანამედროვე კომოდი',
    nameEn: 'Modern Commode',
    nameRu: 'Современный комод',
    category: 'bedroom',
    subcategory: 'commode',
    price: 400,
    oldPrice: 450,
    image: '/images/product-6.jpg',
    rating: 5,
    inStock: true,
    material: 'Wood',
    color: 'white',
  },
];
