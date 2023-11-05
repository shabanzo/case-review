import { Form, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { getAllUsers } from '../../services/user.service';

type Props = {
  assignedId: string;
  handleOnAssign: (assignedId: string) => void;
};

const AssignCaseReview: React.FC<Props> = ({ assignedId, handleOnAssign }) => {
  const { data, isLoading } = useQuery('users', getAllUsers);

  if (isLoading) return <Spinner size="sm" animation="border" />;
  if (!data)
    return (
      <Form.Select size="sm">
        <option value="0">You don't have any users</option>
      </Form.Select>
    );
  return (
    <Form.Select
      size="sm"
      value={assignedId}
      onChange={(e) => {
        handleOnAssign(e.target.value);
      }}
    >
      {data.map((user: any) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </Form.Select>
  );
};
export default AssignCaseReview;
