import { BsPencilSquare } from 'react-icons/bs';
import Link from 'next/link';

const EditProductButton = ({ productId }: { productId: number }) => {
  return (
    <Link href={`/products/edit/${productId}`}>
      <button type="button" className="hover:cursor-pointer text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-md text-sm px-4 py-1.5 text-center inline-flex gap-2 items-center me-2 mb-2">
        <BsPencilSquare/>Edit
      </button>
    </Link>
  );
};

export default EditProductButton;