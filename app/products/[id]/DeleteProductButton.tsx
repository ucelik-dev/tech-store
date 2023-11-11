'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { BsTrash3 } from 'react-icons/bs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import toast from 'react-hot-toast';

const DeleteProductButton = ({ productId }: { productId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteProduct = async () => {
    try {
      setDeleting(true);
      await axios.delete('/api/products/'+ productId);
      router.push('/products');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
    if(!error) toast.success('The product is deleted!');
    else toast.error('The product could not be deleted!')
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting} className='hover:cursor-pointer'>
            <BsTrash3 />
            Delete {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this product?
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteProduct}>Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This product could not be deleted.
          </AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2">OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This product could not be deleted.</AlertDialog.Description>
          <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteProductButton;