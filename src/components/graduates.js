import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import PaginationComponent from './paginationComponent';
import DataTable from 'datatables.net-dt';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

function Graduates() {
  const [graduates, setGraduates] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const tableRef = useRef(null);

  const handleInputChange = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.form);
    setSearchData({
      field: formData.get('searchField'),
      value: formData.get('searchValue'),
    });
  };

  const handleSearchClick = (event) => {
    const options = {
      fullName: 'full name',
      indexNumber: 'index number',
    };
    event.preventDefault();
    axios
      .post('http://localhost:8080/graduates/search', searchData)
      .then((res) => {
        const lengthOfResults = res.data.length;
        if (lengthOfResults > 0) {
          toast.success(
            `${res.data.length} results found for ${
              options[searchData.field]
            } ${searchData.value}`
          );
          setGraduates(res.data.content);
        } else {
          toast.info(
            `No results for ${options[searchData.field]} ${searchData.value}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   useEffect(() => {
  //     const $el = $(tableRef.current);
  //     $el.DataTable({data: );
  //     // return () => {
  //     //   $el.DataTable.destroy(true);
  //     // };
  //   }, []);

  //   const tableRef = useRef(null);

  const dataTableRef = useRef(null);
  useEffect(() => {
    // $('#myTable').dataTable( {
    //     retrieve: true,
    //     searching: false
    // })
    // $(tableRef.current).DataTable({responsive: true});
  }, []);
  //   useEffect(() => {
  //     const $el = $(tableRef.current);
  //     dataTableRef.current.destroy(true);
  //     dataTableRef.current= $el.DataTable({responsive: true});
  //     // return () => {
  //     //   };
  //   }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/graduates').then((res) => {
      setGraduates(res.data.content);
      setTotalPages(res.data.totalPages);
      const data = res.data;
      $('#gradsTable').dataTable({
        retrieve: true,
        data: data,
        columns: [
        //   { data: 'id' },
          { data: 'indexNumber' },
          { data: 'fullName' },
          {data: 'programme'},
        ],
      });

      //   const $el = $(tableRef.current);
      //   $el.DataTable({
      //     data,
      //   columns: [
      //     { data: 'indexNumber', data: 'fullName', data: 'programme' },
      //   ],
      //   });
      //   new DataTable('#myTable', { responsive: true, data: res.data.content });
    });
  }, []);

  return (
    <>
      {/* <Form className="d-flex flex-wrap mt-5 w-50" onChange={handleInputChange}>
        <Form.Select className="form-control w-50" name="searchField">
          <option value="indexNumber">Index number</option>
          <option value="fullName">Full name</option>
        </Form.Select>
        <input
          className="form-control"
          type="text"
          name="searchValue"
          required
        />
        <Button type="submit" variant="success" onClick={handleSearchClick} disabled={!searchData.value}>
          Search
        </Button>
      </Form> */}
      {/* <Table responsive striped bordered hover size="sm" className="mt-5 display" id="myTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Index Number</th>
            <th>Full Name</th>
            <th>Programme</th>
          </tr>
        </thead>
        <tbody>
          {graduates.map((graduate, index) => {
            return (
              <tr key={graduate.id}>
                <td>{index + 1}</td>
                <td>{graduate.indexNumber}</td>
                <td>{graduate.fullName}</td>
                <td>{graduate.programme}</td>
              </tr>
            );
          })}
        </tbody>
      </Table> */}
      {/* <PaginationComponent totalPages={`${totalPages}`} /> */}

      {/*  */}

      <table className="mt-5 display" id="gradsTable">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Index Number</th>
            <th>Full Name</th>
            <th>Programme</th>
          </tr>
        </thead>
        {/* <tbody>
          {graduates.map((graduate, index) => {
            return (
              <tr key={graduate.id}>
                <td>{index + 1}</td>
                <td>{graduate.indexNumber}</td>
                <td>{graduate.fullName}</td>
                <td>{graduate.programme}</td>
              </tr>
            );
          })}
        </tbody> */}
      </table>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default Graduates;
