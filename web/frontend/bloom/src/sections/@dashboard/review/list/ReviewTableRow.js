import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import axios from '../../../../utils/axios';


// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onIsbanRow: PropTypes.func,
};

// const onIsbanRow =  async (review_id)  =>{
//   try {
//     // const user = localStorage.getItem('user');
//     // if(user != null){
//       // const parseUser = JSON.parse(user);
//       const response = await axios.patch(`/review/${review_id}`, {
//         // headers : {
//         //   Authorization: parseUser.access_token
//         // }
//       });
//       console.log(response);
//     // }
//   } catch (error) {
//     console.error(error);
//   }
// }

export default function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow, onIsbanRow}) {
  const theme = useTheme();

  // const { sent, invoiceNumber, createDate, dueDate, status, invoiceTo, totalPrice } = row;
  // const { sent, invoiceNumber, status, invoiceTo, totalPrice} = row;
  const { review_id, is_ban, nickname, content, comment} = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };



  return (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={invoiceTo.name} color={createAvatar(invoiceTo.name).color} sx={{ mr: 2 }}>
          {createAvatar(invoiceTo.name).name}
        </Avatar> */}

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {nickname}
          </Typography>

          {/* <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {`INV-${invoiceNumber}`}
          </Link> */}
        </Stack>
      </TableCell>

      {/* <TableCell align="left">{fDate(createDate)}</TableCell>

      <TableCell align="left">{fDate(dueDate)}</TableCell> */}

      <TableCell align="center">{content}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        <Iconify
            icon={comment ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!comment && { color: 'warning.main' }),
            }}
          />
      </TableCell>

      <TableCell align="right">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (is_ban === 'Y' && 'success') ||
            (is_ban === 'N' && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {is_ban}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onIsbanRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                신고하기
              </MenuItem>
{/* 
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem> */}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
