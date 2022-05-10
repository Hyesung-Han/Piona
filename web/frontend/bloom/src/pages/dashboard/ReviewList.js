import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import Swal from 'sweetalert2';
import {
  Box,
  Card,
  Tab,
  Tabs,
  Table,
  Switch,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// utils
import axios from '../../utils/axios';
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
// sections
import { InvoiceTableRow } from '../../sections/@dashboard/review/list';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'Y', 'N'];

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: '이름', align: 'left' },
  { id: 'price', label: '리뷰', align: 'center' },
  { id: 'sent', label: '답변 여부', align: 'center'},
  { id: 'status', label: '신고 상태', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ReviewList() {

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
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [reviewList, setReviewList] = useState([]);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  useEffect(() => {
    getReviewList();
  }, []);


  const handleIsBanRow = async (id) => {
    try {
      const user = localStorage.getItem('user');
      if(user != null){
        const parseUser = JSON.parse(user);
        const response = await axios.patch(`/api/review/${id}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        })
        console.log(response);
        alert("리뷰를 신고했습니다.", "success")
        await getReviewList();
      }
    } catch (error) {
      console.error(error);
    }
  };
    
  const getReviewList = async () => {
    try {
      const user = localStorage.getItem('user');
      if(user != null){
        const parseUser = JSON.parse(user);
        console.log(parseUser);
        const response = await axios.get(`/api/review?shop_number=${parseUser.shop_number}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        });
        if(response.data.result === 'success'){
          const {data} = response.data;
          
          return setReviewList(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isNotFound = !reviewList.length;

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
          heading="Review List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Reviews', href: PATH_DASHBOARD.review.root },
            { name: 'List' },
          ]}
        />

        <Card>
          <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatus}
              onChange={onChangeFilterStatus}
              sx={{ px: 2, bgcolor: 'background.neutral' }}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab disableRipple key={tab} label={tab} value={tab} />
              ))}
            </Tabs>

          <Divider />
          <Scrollbar>
            <TableContainer sx={{ mt: 1, minWidth: 800, position: 'relative' }}>
              {selected.length > 0 }

              <Table  size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={reviewList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {console.log(reviewList)}
                  {reviewList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InvoiceTableRow
                      key={row.review_id}
                      row={row}
                      selected={selected.includes(row.review_id)}
                      onIsbanRow={() => handleIsBanRow(row.review_id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, reviewList.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={reviewList.length}
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