import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, MenuItem } from '@mui/material';
// utils


// ----------------------------------------------------------------------

SaleTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

export default function SaleTableRow({ row, selected}) {
  const theme = useTheme();

  const { date, price, data} = row;

  return (
    <>
    {data.map((rows, index) => (
    // eslint-disable-next-line react/jsx-key
    <TableRow 
      hover selected={selected}                 
       sx={{borderBottom: '1px solid #C4CDD5'}}
      >

      { index === 0 ? 
      <TableCell rowSpan={data.length}  align="center" sx={{borderRight: '1px solid #C4CDD5'}}>
        <Typography variant="subtitle2" noWrap>
            {date}
        </Typography>
      </TableCell> : ""}
      <TableCell align="center">{rows.item_name}</TableCell>
      <TableCell align="center">{(rows.price/rows.quantity).toLocaleString()}</TableCell>

      <TableCell align="center">{rows.quantity}</TableCell>
      <TableCell align="center">{rows.price.toLocaleString()}</TableCell>
      
      { index === 0 ? 
      <TableCell rowSpan={data.length} align="center" sx={{borderLeft: '1px solid #C4CDD5'}}>{price.toLocaleString()}</TableCell>:""}
    </TableRow>
    ))}
    </>
  );
}
