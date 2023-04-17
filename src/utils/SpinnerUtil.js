import Spinner from 'react-bootstrap/Spinner';

function SpinnerUtil() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" variant="success" />
    </div>
  );
}

export default SpinnerUtil;
