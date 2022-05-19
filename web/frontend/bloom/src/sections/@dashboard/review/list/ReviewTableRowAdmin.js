import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, MenuItem } from '@mui/material';
// utils

// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';


// ----------------------------------------------------------------------

ReviewTableRowAdmin.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onCancelBan: PropTypes.func,
  onOpenCompose: PropTypes.func,
  onOpenReview: PropTypes.func,
  onDeleteReview: PropTypes.func,
};

export default function ReviewTableRowAdmin({ row, selected, onCancelBan, onDeleteReview, onOpenCompose, onOpenReview}) {
  const theme = useTheme();

  const { shop_name, review_id, is_ban, nickname, content, comment} = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenCompose = () => {
    onOpenCompose();
    onOpenReview();
  };

  return (
    <TableRow 
      hover selected={selected}
    >
      <TableCell >{shop_name}</TableCell>
      <TableCell >
          <Typography variant="subtitle2" noWrap>
            {nickname}
          </Typography>
      </TableCell>
      <TableCell align="center" onClick={handleOpenCompose} >{content}</TableCell>

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

      <TableCell align="center">
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
                  onCancelBan();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:minus-circle-outline'} />
                신고취소
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteReview();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                리뷰삭제
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
