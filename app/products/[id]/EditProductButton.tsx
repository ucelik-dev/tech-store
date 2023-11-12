import { BsPencilSquare } from 'react-icons/bs';
import Link from 'next/link';

const EditProductButton = ({ productId }: { productId: number }) => {
  return (
    <Link href={`/products/edit/${productId}`}>
      <button className=' bg-blue-600 text-white hover:cursor-pointer' >
        <BsPencilSquare />
        Edit
      </button>
    </Link>
  );
};

export default EditProductButton;