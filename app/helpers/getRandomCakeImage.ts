const CAKE_IMAGES = [
  {
    alt: 'cake-face',
    path: '/images/cake-face.png'
  },
  {
    alt: 'kiddo-cake',
    path: '/images/kiddo-cake.png'
  }, 
  {
    alt: 'brown-dog-cake',
    path: '/images/brown-dog-cake.png'
  },
  {
    alt: 'throw-cake',
    path: '/images/throw-cake.png'
  },
  {
    alt: 'choc-cake',
    path: '/images/choc-cake.png'
  }
];

export const getRandomCakeImage = () => {
  const randomIdx = Math.floor(Math.random() * CAKE_IMAGES.length);
  return CAKE_IMAGES[randomIdx];
};