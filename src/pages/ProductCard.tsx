import { useDispatch } from 'react-redux';
import { toggleLike, deleteProduct } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import { truncate } from '../utils/truncate';

interface Props {
  id: number | string;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

export function ProductCard({ id, title, description, image, liked }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="border rounded p-4 flex flex-col">
      <img
        src={image}
        alt={title}
        className="h-48 object-contain mb-2 cursor-pointer"
        onClick={() => navigate(`/products/${id}`)}
      />
      <h2
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate(`/products/${id}`)}
      >
        {title}
      </h2>
      <p className="text-sm text-gray-700 flex-grow">
        {truncate(description, 100)}
      </p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => dispatch(toggleLike(id))}
          className={liked ? 'text-red-500' : 'text-gray-500'}
        >
          ♥
        </button>
        <button
          onClick={() => dispatch(deleteProduct(id))}
          className="text-gray-500"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
