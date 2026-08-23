export const Pagination = {
  getLastPage(total: number, limit: number): number {
    return Math.ceil(total / limit);
  },
};
