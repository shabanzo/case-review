import { Container, Spinner } from 'react-bootstrap';

const Loading: React.FC = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '50vh' }}
    >
      <Spinner animation="grow" />
    </Container>
  );
};
export default Loading;
