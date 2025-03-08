import { Modal, Form, Input } from "antd";
import { FC, useEffect } from "react";

interface UpdateFormProps {
  visible: boolean;
  onCancel: () => void;
  data?: BranchTyping.BranchDTO;
  onUpdate: (values: BranchTyping.BranchInfo) => void;
}

const UpdateBranch: FC<UpdateFormProps> = ({ visible, onCancel, data, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data); // Fill dữ liệu khi mở modal
    }
  }, [data, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values); // Gửi dữ liệu cập nhật về component cha
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="Cập nhật thông tin chi nhánh"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="branchId" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="branchName" label="Name" rules={[{ required: true, message: "Branch name is required!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Address is required!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBranch;
