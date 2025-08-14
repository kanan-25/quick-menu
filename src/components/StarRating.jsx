import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'w-5 h-5' }) => {
  const handleStarClick = (starRating) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          {star <= rating ? (
            <StarIcon className={`${size} text-yellow-400`} />
          ) : (
            <StarOutlineIcon className={`${size} text-gray-300`} />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;