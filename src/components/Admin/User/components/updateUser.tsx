import { Modal, Form, Input } from "antd";
import { FC, useEffect } from "react";

interface UpdateFormProps {
  visible: boolean;
  onCancel: () => void;
  data?: UserTyping.UserDTO;
  onUpdate: (values: UserTyping.UserInfo) => void;
}

const UpdateUser: FC<UpdateFormProps> = ({ visible, onCancel, data, onUpdate }) => {
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
      title="Cập nhật thông tin User"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email is required!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;
