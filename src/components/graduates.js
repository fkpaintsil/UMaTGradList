import { useEffect, useState } from 'react';
import axios from 'axios';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { API_BASE } from '../constants';
import SpinnerUtil from '../utils/SpinnerUtil';
import Toast from '../utils/Toast';

function Graduates() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_BASE}/graduates`)
      .then((res) => {
        const data = res.data;
        $('#gradsTable').DataTable({
          retrieve: true,
          data: data,
          columns: [
            { data: 'indexNumber' },
            { data: 'fullName' },
            { data: 'programme' },
          ],
        });
      }).then(setIsLoading(false))
      .catch((_err) => Toast('error', 'Something went wrong'));
  }, []);

  return (
    <>
      {isLoading && <SpinnerUtil />}
      {!isLoading && (
        <div className="mt-5">
          <table className="display" id="gradsTable">
            <thead>
              <tr>
                <th>Index Number</th>
                <th>Full Name</th>
                <th>Programme</th>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </>
  );
}

export default Graduates;
