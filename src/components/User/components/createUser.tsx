import { FC, PropsWithChildren } from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  visible: boolean;
  onCancel: () => void;
}

const CreateUser: FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { visible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title='Thêm mới User'
      open={visible}
      onCancel={() => onCancel()}
      footer={null}
    >
      { props.children }
    </Modal>
  )
}

export default CreateUser;