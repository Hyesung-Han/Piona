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
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../components/table';
// sections
import { ReviewTableRow } from '../../sections/@dashboard/review/list';
import ReviewCompose from '../../sections/@dashboard/review/details/ReviewCompose';

// ----------------------------------------------------------------------

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

  const [tableData, setReviewList] = useState([]);

  const [openCompose, setOpenCompose] = useState(false);

  const [openReview, setOpenReview] = useState('');

  const [reviewDetail, setReviewDetail] = useState('');

  const [reviewImg, setReviewImg] = useState([]);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  useEffect(() => {
    getReviewList();
  }, []);


  const handleIsBanRow = async (id) => {
    try {
      const user = localStorage.getItem('user');
      if(user != null){
        const parseUser = JSON.parse(user);
        const response = await axios.patch(`/api/review/${id}`, {}, {
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

  const handleOpenReviewDetail = (id) => {
    setOpenReview(id);
    getReviewDetail(id);
  };

  const getReviewDetail = async (id) => {
    try {
      const user = localStorage.getItem('user');
      if(user != null){
        const parseUser = JSON.parse(user);
        const response = await axios.get(`/api/review/${id}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        })
        console.log(response.data);
        if(response.data.result === "success"){
          setReviewDetail(response.data.data);
          if(response.data.data.image_url !== null){
            setReviewImg(response.data.data.image_url.split(','));
          }else{
            setReviewImg([]);
          }
          // return response.data.data;
        }
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
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterStatus,
  });
  const getLengthByStatus = (status) => tableData.filter((item) => item.comment === status).length;
  const STATUS_OPTIONS = [
    { value: 'all', label: 'All', color: 'info', count: tableData.length },
    { value: true, label: '답변완료', color: 'success', count: getLengthByStatus(true) },
    { value: false, label: '미답변', color: 'warning', count: getLengthByStatus(false) },
  ];

  const isNotFound =
    (!dataFiltered.length && !!filterStatus);

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
          heading="리뷰 목록"
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
          <Scrollbar>
            <TableContainer sx={{ mt: 1, minWidth: 800, position: 'relative' }}>
              {selected.length > 0 }

              <Table  size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {/* {console.log(dataFiltered)} */}
                  <>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <ReviewTableRow
                        key={row.review_id}
                        row={row}
                        selected={selected.includes(row.review_id)}
                        onIsbanRow={() => handleIsBanRow(row.review_id)}
                        onOpenCompose={() => setOpenCompose(true)} 
                        onOpenReview={() => handleOpenReviewDetail(row.review_id)} 
                      />
                  ))}
                      <ReviewCompose 
                        key={openReview}
                        row={reviewDetail}
                        image = {reviewImg}
                        isOpenCompose={openCompose} 
                        onCloseCompose={() => setOpenCompose(false)}
                        onRedirect={() => getReviewList()}
                        // row={openReview}
                         />
                        </>

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)} />

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
}) {

  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.comment === filterStatus);
  }

  return tableData;
}