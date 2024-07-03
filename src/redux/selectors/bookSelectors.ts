import { RootState } from "../types/root.types";

export type QueryType = 'byName' | 'byAuthor';

export const filterBooks = (state: RootState, query: { type: QueryType, value?: string }) => {
  if (!query.value) return state.books.value;

  const lowerCaseQuery = query.value.toLowerCase();

  if (query.type === 'byName') {
    return state.books.value.filter(book => book.title.toLowerCase().includes(lowerCaseQuery));
  } else if (query.type === 'byAuthor') {
    return state.books.value.filter((book) => {
      const fullName = `${book.author.firstName} ${book.author.lastName}`.toLowerCase();

      return fullName.includes(lowerCaseQuery);
    });
  }

  return []; // Return empty array if query type is neither 'byName' nor 'byAuthor'
}