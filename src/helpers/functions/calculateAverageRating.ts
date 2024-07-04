import { Rating } from "@/redux/types/book.types";

export const calculateAverageRating = (ratings: Rating[]): number => {
  if (ratings.length === 0) return 0;

  const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = totalRatings / ratings.length;

  return parseFloat(averageRating.toFixed(1));
};