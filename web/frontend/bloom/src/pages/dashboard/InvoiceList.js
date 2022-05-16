import sumBy from 'lodash/sumBy';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';


// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// utils
import axios from '../../utils/axios';
import { fDate } from '../../utils/formatTime';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tab' },
  { id: 'invoiceNumber', label: '예약일', align: 'center' },
  { id: 'createDate', label: '예약자', align: 'center' },
  { id: 'dueDate', label: '연락처', align: 'center' },
  { id: 'price', label: '주문번호', align: 'center'},
  { id: 'sent', label: '건수', align: 'center'},
  { id: 'total', label: '결제 금액', align: 'center'},
  { id: 'status', label: '상태', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function InvoiceList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

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
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  useEffect(() => {
    getReservationList();
  }, []);

  const [tableData, setReservationList] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const getReservationList = async () => {
    try {
      const user = localStorage.getItem('user');
      if(user != null){
        const parseUser = JSON.parse(user);
        console.log(parseUser);
        const response = await axios.get(`/api/reservation?shop_number=${parseUser.shop_number}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        });
        if(response.data.result === 'success'){
          const {data} = response.data;
          setReservationList(data);
          return data;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const denseHeight = dense ? 56 : 76;

  const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;

  const handleChangeRow = async (id, orderStatus) => {
    try {
      const user = localStorage.getItem('user');
      if(user != null){
        const parseUser = JSON.parse(user);
        const response = await axios.patch(`/api/reservation`, {
            reservation_id: id,
            status: orderStatus,
        },{
          headers : {
            Authorization: parseUser.access_token
          }
        })
        console.log(response);
        alert("예약상태를 변경했습니다.", "success")
        await getReservationList();
      }
    } catch (error) {
      console.error(error);
      alert("예약상태 변경에 실패했습니다.", "error")
    }
  };

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: tableData.length },
    { value: 'U', label: '대여중', color: 'success', count: getLengthByStatus('U') },
    { value: 'D', label: '반납완료', color: 'warning', count: getLengthByStatus('D') },
    { value: 'R', label: '준비중', color: 'error', count: getLengthByStatus('R') },
    { value: 'C', label: '예약취소', color: 'default', count: getLengthByStatus('C') },
    { value: 'F', label: '미반납', color: 'default', count: getLengthByStatus('F') },
  ];

  async function alert(msg, icons) {
    await Swal.fire({
      icon: icons,
      title: msg,
    });
  }

  return (
    <Page title="Invoice: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="예약 관리"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            { name: '예약 현황'},
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Total"
                total={tableData.length}
                percent={100}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="대여중"
                total={getLengthByStatus('U')}
                percent={getPercentByStatus('U')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="반납완료"
                total={getLengthByStatus('D')}
                percent={getPercentByStatus('D')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title="준비중"
                total={getLengthByStatus('R')}
                percent={getPercentByStatus('R')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
              <InvoiceAnalytic
                title="예약취소"
                total={getLengthByStatus('C')}
                percent={getPercentByStatus('C')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
              <InvoiceAnalytic
                title="미반납"
                total={getLengthByStatus('F')}
                percent={getPercentByStatus('F')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            filterName={filterName}
            filterService={filterService}
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
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom 
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InvoiceTableRow
                      key={row.reservation_id}
                      row={row}
                      onChangeRow={(orderStatus) => handleChangeRow(row.reservation_id, orderStatus)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterStatus,
  filterStartDate,
  filterEndDate,
}) {

  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  // if (filterName) {
  //   tableData = tableData.filter(
  //     (item) =>
  //       item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
  //       item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
      new Date(fDate(item.detail[0].reservation_date)).getTime() >= new Date(filterStartDate).getTime() && new Date(fDate(item.detail[0].reservation_date)).getTime() <= new Date(filterEndDate).getTime()
    );
  }

  return tableData;
}
