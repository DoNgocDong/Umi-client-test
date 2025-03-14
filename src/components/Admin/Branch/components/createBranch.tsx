import { FC, PropsWithChildren } from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  visible: boolean;
  onCancel: () => void;
}

const CreateBranch: FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { visible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title='Thêm chi nhánh mới'
      open={visible}
      onCancel={() => onCancel()}
      footer={null}
    >
      { props.children }
    </Modal>
  )
}

export default CreateBranch;