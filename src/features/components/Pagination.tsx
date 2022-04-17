import { useMemo } from 'react';
import * as React from 'react';
import { Pagination as BasePagination } from '@mui/material';
import styled from '@emotion/styled';
import { useAppSelector } from '../../app/hooks';
import { PAGE_SIZE } from './../constants';

const StyledPagination = styled(BasePagination)`
  display: flex;
  justify-content: center;
`;

interface PaginationProps {
  onChange: (page: number) => void
  page: number;
}

function Pagination ({ page, onChange }: PaginationProps) {
  const total = useAppSelector((state) => state.gallery.total);
  const pagesCount = useMemo(() => Math.ceil(total / PAGE_SIZE), [total]);

  return (
    pagesCount === 0
      ? null
      : (
      <StyledPagination
        page={page}
        count={pagesCount}
        onChange={(_event, newPage) => {
          onChange(newPage);
        }}
      />
        )
  );
}

export default Pagination;
