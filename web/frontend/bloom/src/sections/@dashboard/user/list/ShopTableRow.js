import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, MenuItem } from '@mui/material';
// swal
import Swal from 'sweetalert2';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
// utils
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

AdminShopTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};

export default function AdminShopTableRow({ row, selected, getUserList }) {
  const theme = useTheme();

  const { user_id, shop_number, phone, is_del, created_at } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onClickBanHandler = async() => {
    try {
      const response = await axios.patch(`/api/admin?user_id=${row.user_id}&status_type=B`, {}, {
        headers : {
          Authorization: parseUser.access_token,
        }
      });
      const {data} = response;
      if(data.result === 'success') {
        getUserList();
        Swal.fire('수정 되었습니다.')
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <TableRow hover selected={selected}>

      <TableCell align="left">{user_id}</TableCell>

      <TableCell align="left">{shop_number}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {phone}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {created_at.split('T')[0]}
      </TableCell>

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(is_del === 'B' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {is_del==='N'?'Active':'Banned'}
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
                  onClickBanHandler();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                회원 정지
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
