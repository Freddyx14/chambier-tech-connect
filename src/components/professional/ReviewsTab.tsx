
import { Review } from "@/types/professional";
import StarRating from "./StarRating";

interface ReviewsTabProps {
  reviews: Review[];
}

const ReviewsTab = ({ reviews }: ReviewsTabProps) => {
  // Format date to a more readable format (DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700">No hay reseñas</h3>
        <p className="text-gray-600">Este profesional aún no tiene reseñas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex justify-between">
            <span className="font-medium">{review.user_name}</span>
            <span className="text-gray-500 text-sm">{formatDate(review.created_at)}</span>
          </div>
          <div className="flex mt-1">
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;
