import { Card, Flex, Link as RadixLink, Text } from '@radix-ui/themes';
import NextLink from "next/link";

interface Props {
    delivered: number;
    being_prepared: number;
    cancelled: number;
}

const OrderSummary = ({ delivered, being_prepared, cancelled }: Props) => {
    const statuses: {
        label: string;
        value: number;
        status: string;
      }[] = [
        { label: 'Delivered', value: delivered, status: 'Delivered' },
        { label: 'Being Prepared', value: being_prepared, status: 'Being_Prepared'},
        { label: 'Cancelled', value: cancelled, status: 'Cancelled'},
      ];

  return (
    <Flex gap="4" direction={{ initial: 'column', sm: 'row'}}>
      {statuses.map((status) => (
        <NextLink key={status.label} href={`/orders?status=${status.status}`} passHref legacyBehavior>
          <Card className={`cursor-pointer w-full`}>
            <Flex direction="column" gap="1">
                <Text className='text-sm font-medium'>
                  {status.label}
                </Text>
              <Text size="5" className='font-bold'>{status.value}</Text>
            </Flex>
          </Card>
        </NextLink>
      ))}
    </Flex>
  )
}

export default OrderSummary