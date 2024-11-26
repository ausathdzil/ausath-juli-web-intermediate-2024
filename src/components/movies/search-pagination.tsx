'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}

export default function SearchPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1 ? 'pointer-events-none opcaity-50' : ''
            }
            tabIndex={currentPage === 1 ? -1 : undefined}
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage === 1}
            isActive={currentPage !== 1}
          />
        </PaginationItem>
        {allPages.map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                href={createPageURL(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages ? 'pointer-events-none opcaity-50' : ''
            }
            tabIndex={currentPage === totalPages ? -1 : undefined}
            aria-disabled={currentPage === totalPages}
            href={createPageURL(currentPage + 1)}
            isActive={currentPage !== totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
