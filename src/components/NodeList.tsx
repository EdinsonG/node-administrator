'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Paper } from '@mui/material';
import { NodeListProps } from '@/interfaces';

export default function NodeList({ headers, children, loading }: Readonly<NodeListProps>) {
  return (
    <TableContainer 
      component={Paper} sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Table sx={{ minWidth: { xs: 400, sm: 650 } }}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            {headers.map((header) => (
              <TableCell key={header.id} align="center" sx={{ fontWeight: 'bold'}}>
                {header.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={`row-skeleton-${rowIndex}`}>
                {headers.map((header) => (
                  <TableCell key={`cell-skeleton-${header.id}-${rowIndex}`} align="center">
                    <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}