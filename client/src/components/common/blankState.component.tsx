import { Container } from 'react-bootstrap';

type Props = {
  message: string;
};

const BlankState: React.FC<Props> = ({ message }) => {
  return (
    <Container>
      <div className="blank-state blank-state-lg">
        <h6>{message}</h6>
      </div>
    </Container>
  );
};
export default BlankState;
