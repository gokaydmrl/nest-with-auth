export const foods = [
  {
    id: 1,
    userId: 123,
    name: 'Chicken',
    category: 'meat',
    ingredients: [
      'chicken',
      'rice',
      'broccoli',
      'carrots',
      'soy sauce',
      'ginger',
    ],
    image: [
      { link: `https://example.com/image1.jpg`, description: `this and that` },
      { link: `https://example.com/image2.jpg`, description: `this and that` },
    ],
    description: 's',
    notes: '',
    like: 5,
    comments: [{ id: 1, userId: 789, comment: 'good ' }],
  },
];
export const user = {
  id: 123,
  name: 'John Doe',
  email: ``,
};
export const comment = { id: 1, userId: 123, comment: 'good ' };
export const category = {
  id: 1,
  name: 'meat',
};
export const image = {
  id: 1,
  link: `https://example.com/image1.jpg`,
  description: `this and that`,
};
