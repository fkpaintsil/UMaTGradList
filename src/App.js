import Graduates from './components/graduates';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {

  const [graduates, setGraduates] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const tableRef = useRef(null);
  useEffect(() => {
    axios.get('http://localhost:8080/graduates').then((res) => {
      setGraduates(res.data.content);
      setTotalPages(res.data.totalPages);
      const data = res.data.content;
      console.log('data', data);

      //   const $el = $(tableRef.current);
      //   $el.DataTable({
      //     data,
      //     columns: [
      //       { data: 'indexNumber', data: 'fullName', data: 'programme' },
      //     ],
      //   });
      //   new DataTable('#myTable', { responsive: true, data: res.data.content });
    });
  }, []);
  return (
    <div className="container">
      <Graduates data={[        {
            "id": "9ace4e14-e8f9-4d83-9777-a91a62c6437a",
            "indexNumber": "42504818",
            "fullName": "Mr. QUAYE  JONATHAN",
            "programme": "Renewable Energy Engineering"
        },
        {
            "id": "2926400a-37d3-49c1-b9bf-6a87d1163ae3",
            "indexNumber": "41202618",
            "fullName": "Mr. FRIMPONG STEPHEN REVIVAL",
            "programme": "Geological Engineering"
        }]}/>
    </div>
  );
}

export default App;
