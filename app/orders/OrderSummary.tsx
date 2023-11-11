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
        color: string;
      }[] = [
        { label: 'Delivered', value: delivered, status: 'Delivered', color: '!bg-green-50' },
        { label: 'Being Prepared', value: being_prepared, status: 'Being_Prepared', color: '!bg-orange-50' },
        { label: 'Cancelled', value: cancelled, status: 'Cancelled', color: '!bg-red-50 ' },
      ];

  return (
    <Flex gap="4" direction={{ initial: 'column', sm: 'row'}}>
      {statuses.map((status) => (
        <NextLink key={status.label} href={`/orders?status=${status.status}`} passHref legacyBehavior>
          <Card className={`cursor-pointer w-full ${status.color}`}>
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