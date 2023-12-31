'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { BsTrash3 } from 'react-icons/bs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SpinnerButton from '@/app/components/SpinnerButton';
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
          <button disabled={isDeleting} type="button" className="hover:cursor-pointer text-white bg-red-600 hover:bg-red-700 opacity-80 dark:opacity-100 font-medium rounded-md text-sm px-4 py-1.5 text-center inline-flex gap-2 items-center me-2 mb-2">
            <BsTrash3 />
            Delete {isDeleting && <SpinnerButton />}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this product?
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <button className="hover:cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300 opacity-70 font-medium rounded-md text-sm px-4 py-1.5 text-center inline-flex gap-2 items-center me-2 mb-2">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <button className="hover:cursor-pointer text-white bg-red-600 hover:bg-red-700 opacity-80 font-medium rounded-md text-sm px-4 py-1.5 text-center inline-flex gap-2 items-center me-2 mb-2" onClick={deleteProduct}>Delete</button>
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