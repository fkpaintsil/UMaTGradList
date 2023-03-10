import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent(props) {
  let active = 0;
  let items = [];
  for (let number = 0; number <= props.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
}
export default PaginationComponent;
