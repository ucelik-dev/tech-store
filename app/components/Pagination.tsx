'use client'

import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  }

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
        <BsChevronDoubleLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <BsChevronLeft />
      </Button>

      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <BsChevronRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
        <BsChevronDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
