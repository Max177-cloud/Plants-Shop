import img1 from '@images/Group 25.png'
import img2 from '@images/01.png'
import img3 from '@images/02.png'
import img4 from '@images/03.png'
import img5 from '@images/04.png'
import img6 from '@images/image 15.png'
import img7 from '@images/image 7.png'
import img8 from '@images/image 8.png'
import img9 from '@images/image 9.png'
import img10 from '@images/image 10.png'
import img11 from '@images/product-20-320x320 1.png'
import img12 from '@images/product-21-320x320 1.png'

export const products = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    category: 'Indoor',
    price: 49.99,
    rating: 4.8,
    image: img1,
    description: 'Крупное тропическое растение с узнаваемыми разрезными листьями.',
  },
  {
    id: 'p2',
    name: 'Фикус эластика',
    category: 'Indoor',
    price: 32.5,
    rating: 4.6,
    image: img2,
    description: 'Резиновый фикус для яркого рассеянного света.',
  },
  {
    id: 'p3',
    name: 'Сансевиерия',
    category: 'Low care',
    price: 24.9,
    rating: 4.7,
    image: img3,
    description: 'Неприхотливое растение для начинающих.',
  },
  {
    id: 'p4',
    name: 'Драцена',
    category: 'Indoor',
    price: 28,
    rating: 4.5,
    image: img4,
    description: 'Стройное растение для гостиной и офиса.',
  },
  {
    id: 'p5',
    name: 'Спатифиллум',
    category: 'Indoor',
    price: 27,
    rating: 4.5,
    image: img5,
    description: 'Цветущее растение с выразительной листвой.',
  },
  {
    id: 'p6',
    name: 'Антуриум',
    category: 'Indoor',
    price: 36.99,
    rating: 4.3,
    image: img6,
    description: 'Яркие соцветия и глянцевые листья.',
  },
  {
    id: 'p7',
    name: 'Пилея',
    category: 'Low care',
    price: 21.99,
    rating: 4.2,
    image: img7,
    description: 'Компактное растение с круглыми листьями.',
  },
  {
    id: 'p8',
    name: 'Калатея',
    category: 'Indoor',
    price: 34.5,
    rating: 4.4,
    image: img8,
    description: 'Декоративный узор на листьях.',
  },
  {
    id: 'p9',
    name: 'Замиокулькас',
    category: 'Low care',
    price: 41,
    rating: 4.6,
    image: img9,
    description: 'Засухоустойчивое растение с глянцевой листвой.',
  },
  {
    id: 'p10',
    name: 'Набор удобрений',
    category: 'Accessories',
    price: 14.99,
    rating: 4.1,
    image: img10,
    description: 'Сбалансированное питание для комнатных растений.',
  },
  {
    id: 'p11',
    name: 'Горшок керамический M',
    category: 'Accessories',
    price: 18,
    rating: 4.0,
    image: img11,
    description: 'Дренажное отверстие, матовая глазурь.',
  },
  {
    id: 'p12',
    name: 'Горшок керамический L',
    category: 'Accessories',
    price: 22,
    rating: 4.0,
    image: img12,
    description: 'Для крупных экземпляров и монстеры.',
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
