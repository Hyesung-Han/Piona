import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { item_id, shop_number, name, price, total_quantity, description, image_url } = product;

  const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}

        <Image alt={name} src={image_url} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to='/dashboard/e-commerce/product/nike-air-force-1-ndestrukt' color="inherit" component={RouterLink}>
        {/* <Link to={`/${item_id}`} color="inherit" component={RouterLink}> */}
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" >
            {/* {priceSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Typography>
            )} */}

            <Typography variant="subtitle1">{price}원</Typography>
            <Typography variant="subtitle2" color="rgba(132, 132, 132, 1)" ml={11}>수량 : {total_quantity}개</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
