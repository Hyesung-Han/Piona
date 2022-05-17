import { useState, useEffect } from 'react';
// @mui
import Swal from 'sweetalert2';
import {
  Card,
  Table,
  TableRow, 
  TableCell,
  Typography,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from '@mui/material';
// utils
import axios from '../../utils/axios';
import { fcDate } from '../../utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { emptyRows } from '../../hooks/useTable';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../components/table';
import useAuth from '../../hooks/useAuth';
// sections
import { SaleTableRow, SaleTableToolbar } from '../../sections/@dashboard/sale/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: '날짜', align: 'center' },
  { id: 'itemName', label: '상품명', align: 'center' },
  { id: 'price', label: '단가', align: 'center'},
  { id: 'count', label: '수량', align: 'center' },
  { id: 'totalPrice', label: '총 금액', align: 'center' },
  { id: 'dateTotalPrice', label: '총 매출 현황', align: 'center' },
];

// ----------------------------------------------------------------------

export default function SaleList() {
  const { user } = useAuth();

  const { themeStretch } = useSettings();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,

    //
    onSort,
    onChangeDense,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setSaleList] = useState([]);

  const [totalPrice, setTotalPrice] = useState();

  const [filterStartDate, setFilterStartDate] = useState(fcDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));

  const [filterEndDate, setFilterEndDate] = useState(fcDate(new Date()));

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  useEffect(() => {
    getSaleList();
  }, [filterStartDate, filterEndDate]);
    
  const getSaleList = async () => {
    try {
      if(user != null){
        let url = `/api/sale?shop_number=${user.shop_number}`;
        if(filterStartDate != null) {
          url += `&start_date=${fcDate(filterStartDate)}`;
        }
        if(filterEndDate != null){
          url += `&end_date=${fcDate(filterEndDate)}`;
        } 

        const response = await axios.get(url, {
          headers : {
            Authorization: user.access_token
          }
        });
        if(response.data.result === 'success'){
          console.log(response.data);
          const data = applyGroupFilter(response.data.data);
          data.sort((a, b) => { if (a.date < b.date) return -1; if (a.date > b.date) return 1; return 0; });
          console.log(data);
          let price = 0;
          for (let index = 0; index < data.length; index+=1) {
            price += data[index].price;
          }
          setTotalPrice(price.toLocaleString());
          return setSaleList(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isNotFound =
    (!tableData.length && !!filterStatus);

  const denseHeight = dense ? 56 : 76;

    async function alert(msg, icons) {
    await Swal.fire({
      icon: icons,
      title: msg,
    });
  }

  return (
    <Page title="Review: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="정산 관리"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            { name: '매출 정산' },
          ]}
        />

        <Card>
          <Divider />

          <SaleTableToolbar
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ mt: 1, minWidth: 800, position: 'relative' }}>
              {selected.length > 0 }

              <Table  size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={onSort}
                />

                <TableBody>

                  {tableData.map((row) => (
                      <SaleTableRow
                        key={row.date}
                        row={row}
                      />
                  ))}
                      <TableRow 
                        >
                        <TableCell colSpan={6} align="right">
                          <Typography variant="subtitle2" noWrap>
                            {totalPrice} (원)
                          </Typography>
                        </TableCell>
                      </TableRow>

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applyGroupFilter(arr){
  
  const nList = [];
  let _nkey = 0;
  arr.forEach((item, index) => {
    if (index === 0) {
      nList.push({
        date: item.reservation_date,
        price: (item.quantity * item.price),
        data: [item],
      });
    } else {
      const oItem = arr[index - 1];
      if (item.reservation_date === oItem.reservation_date) {
        nList[_nkey].data.push(item);
        nList[_nkey].price += (item.quantity * item.price);
      } else {
          nList.push({
            date: item.reservation_date,
            price: (item.quantity * item.price),
            data: [item],
          });
          _nkey += 1;
      }
    }
  })
  return nList;
}