import { BsPencilSquare } from 'react-icons/bs';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditProductButton = ({ productId }: { productId: number }) => {
  return (
    <Link href={`/products/edit/${productId}`}>
      <Button className='hover:cursor-pointer'>
        <BsPencilSquare />
        Edit
      </Button>
    </Link>
  );
};

export default EditProductButton;