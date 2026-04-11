export interface Product {
  id: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  descriptionKa: string;
  descriptionEn: string;
  descriptionRu: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  rating: number;
  inStock: boolean;
  material: string;
  color: string;
  dimensions: { width: number; height: number; depth: number };
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
    descriptionKa: 'ელეგანტური სკანდინავიური სტილის დივანი, რომელიც იდეალურია თანამედროვე მისაღები ოთახისთვის. დამზადებულია მაღალი ხარისხის ბარხატისგან.',
    descriptionEn: 'Elegant Scandinavian-style sofa, perfect for a modern living room. Made from high-quality velvet fabric.',
    descriptionRu: 'Элегантный диван в скандинавском стиле, идеально подходящий для современной гостиной. Изготовлен из высококачественного бархата.',
    category: 'livingRoom',
    subcategory: 'sofa',
    price: 899.99,
    oldPrice: 1100,
    image: '/images/product-1.jpg',
    images: ['/images/product-1.jpg', '/images/product-2.jpg', '/images/product-3.jpg'],
    rating: 5,
    inStock: true,
    material: 'Velvet',
    color: 'green',
    dimensions: { width: 220, height: 85, depth: 95 },
  },
  {
    id: '2',
    nameKa: 'მინიმალისტური ხის მაგიდა',
    nameEn: 'Minimalist Wood Table',
    nameRu: 'Минималистичный деревянный стол',
    descriptionKa: 'მინიმალისტური დიზაინის ხის მაგიდა, სამზარეულოს ან სასადილოს ოთახისთვის. მყარი მუხის ხისგან დამზადებული.',
    descriptionEn: 'Minimalist design wooden table for kitchen or dining room. Made from solid oak wood.',
    descriptionRu: 'Минималистичный деревянный стол для кухни или столовой. Изготовлен из массива дуба.',
    category: 'tables',
    subcategory: 'kitchenTable',
    price: 450,
    image: '/images/product-2.jpg',
    images: ['/images/product-2.jpg', '/images/product-1.jpg'],
    rating: 4,
    inStock: true,
    material: 'Wood',
    color: 'brown',
    dimensions: { width: 160, height: 75, depth: 90 },
  },
  {
    id: '3',
    nameKa: 'Mid-Century სავარძელი',
    nameEn: 'Mid-Century Armchair',
    nameRu: 'Кресло Mid-Century',
    descriptionKa: 'კლასიკური Mid-Century სტილის სავარძელი ხის ფეხებით. კომფორტული და სტილური.',
    descriptionEn: 'Classic Mid-Century style armchair with wooden legs. Comfortable and stylish.',
    descriptionRu: 'Классическое кресло в стиле Mid-Century с деревянными ножками. Комфортное и стильное.',
    category: 'livingRoom',
    subcategory: 'sofa',
    price: 320,
    oldPrice: 400,
    image: '/images/product-3.jpg',
    images: ['/images/product-3.jpg', '/images/product-1.jpg'],
    rating: 5,
    inStock: true,
    material: 'Wood',
    color: 'gray',
    dimensions: { width: 75, height: 80, depth: 70 },
  },
  {
    id: '4',
    nameKa: 'ტანსაცმლის კარადა',
    nameEn: 'Wardrobe Cabinet',
    nameRu: 'Шкаф для одежды',
    descriptionKa: 'ფართო ტანსაცმლის კარადა თანამედროვე დიზაინით. შიგნით მოწყობილია თაროებით და ჰანგერებისთვის ადგილით.',
    descriptionEn: 'Spacious wardrobe cabinet with modern design. Equipped with shelves and hanger space inside.',
    descriptionRu: 'Просторный шкаф для одежды с современным дизайном. Внутри полки и место для вешалок.',
    category: 'bedroom',
    subcategory: 'wardrobe',
    price: 700,
    oldPrice: 800,
    image: '/images/product-4.jpg',
    images: ['/images/product-4.jpg', '/images/product-5.jpg'],
    rating: 4,
    inStock: true,
    material: 'Wood',
    color: 'white',
    dimensions: { width: 180, height: 220, depth: 60 },
  },
  {
    id: '5',
    nameKa: 'სამეცადინო მაგიდა',
    nameEn: 'Study Desk',
    nameRu: 'Письменный стол',
    descriptionKa: 'კომპაქტური სამეცადინო მაგიდა უჯრებით. იდეალურია სახლის ოფისისთვის ან სტუდენტებისთვის.',
    descriptionEn: 'Compact study desk with drawers. Perfect for home office or students.',
    descriptionRu: 'Компактный письменный стол с ящиками. Идеально подходит для домашнего офиса или студентов.',
    category: 'tables',
    subcategory: 'studyTable',
    price: 330,
    oldPrice: 350,
    image: '/images/product-5.jpg',
    images: ['/images/product-5.jpg', '/images/product-2.jpg'],
    rating: 4,
    inStock: true,
    material: 'Wood',
    color: 'brown',
    dimensions: { width: 120, height: 75, depth: 60 },
  },
  {
    id: '6',
    nameKa: 'თანამედროვე კომოდი',
    nameEn: 'Modern Commode',
    nameRu: 'Современный комод',
    descriptionKa: 'თანამედროვე სტილის კომოდი 4 უჯრით. მინიმალისტური დიზაინი საძინებლის ოთახისთვის.',
    descriptionEn: 'Modern style commode with 4 drawers. Minimalist design for bedroom.',
    descriptionRu: 'Комод в современном стиле с 4 ящиками. Минималистичный дизайн для спальни.',
    category: 'bedroom',
    subcategory: 'commode',
    price: 400,
    oldPrice: 450,
    image: '/images/product-6.jpg',
    images: ['/images/product-6.jpg', '/images/product-4.jpg'],
    rating: 5,
    inStock: true,
    material: 'Wood',
    color: 'white',
    dimensions: { width: 100, height: 90, depth: 45 },
  },
];
