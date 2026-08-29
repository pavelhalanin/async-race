export const Random = {
  random_from_a_to_b(a: number, b: number): number {
    return Math.ceil(Math.random() * (b - a) + a);
  },
};
