import { FC } from 'react';
import { Modal } from 'antd';
import { InterestRateDTO, Group, Unit } from '@/services/interest_rate/typing';
import {
  ProFormSwitch,
  ProFormSelect,
  ProFormText,
  ProFormDigit,
  StepsForm,
} from '@ant-design/pro-components';
import { useState } from 'react';

interface CreateFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: InterestRateDTO) => void;
}

interface GroupStepDTO {
  group: Group;
}

interface Step2DTO {
  rate: number;
  unit: Unit;
  minimumTerm?: number;
  maximumTerm?: number;
}

const CreateRateForm: FC<CreateFormProps> = ({ visible, onCancel, onSubmit }) => {
  const [groupState, setGroup] = useState<Group>(Group.CREDIT);
  const [current, setCurrent] = useState<number>(0);

  const handleSubmit = async (data: InterestRateDTO) => {
    try {
      onSubmit(data); // Gửi dữ liệu cập nhật về component cha
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <StepsForm<InterestRateDTO>
      onFinish={async (data: InterestRateDTO) => {
        setCurrent(0);
        handleSubmit(data);
      }}
      current={current}
      onCurrentChange={setCurrent}
      formProps={{
        validateMessages: {
          required: 'Trường này là bắt buộc!',
        },
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={650}
            title="Tạo lãi suất mới"
            onCancel={() => {
              setCurrent(0);
              onCancel();
            }}
            open={visible}
            footer={submitter}
            destroyOnClose
          >
            {dom}
          </Modal>
        );
      }}
    >
      {/* BƯỚC 1: Chọn Group */}
      <StepsForm.StepForm<GroupStepDTO>
        name="group"
        title="Chọn Group"
        onFinish={async (value) => {
          setGroup(value.group); // Lưu state type để dùng ở step tiếp theo
          return true;
        }}
      >
        <ProFormSelect
          name="group"
          label="Chọn nhóm lãi suất"
          options={[
            { label: 'CREDIT', value: Group.CREDIT },
            { label: 'SAVING', value: Group.SAVING },
          ]}
          initialValue={Group.CREDIT}
          placeholder="Chọn Group"
          rules={[{ required: true, message: 'Bắt buộc!' }]}
        />
      </StepsForm.StepForm>

      {/* BƯỚC 2: Nhập nội dung */}
      <StepsForm.StepForm<Step2DTO>
        name="body"
        title="Nhập thông tin lãi suất"
      >
        <ProFormDigit
          name="rate"
          label="Nhập tỷ lệ lãi"
          rules={[{ required: true, message: 'Bắt buộc!' }]}
        />
        {/* <ProFormSelect<Unit>
          name="unit"
          label="Chọn đơn vị lãi (% / unit)"
          options={[Unit.DAY, Unit.MONTH, Unit.YEAR]}
          initialValue={Unit.YEAR}
          placeholder="Chọn Group"
          rules={[{ required: true, message: 'Bắt buộc!' }]}
        /> */}
        {groupState === Group.SAVING && (
          <>
            <ProFormText
              name="minimumTerm"
              label="Kỳ hạn gửi tiết kiệm tối thiểu"
              placeholder="> 1"
              rules={[
                { required: true, message: 'Bắt buộc!' },
                { min: 1, message: 'Kỳ hạn tối thiểu bằng 1' },
                { type: 'number', transform: (value) => Number(value) },
              ]}
            />

            <ProFormText
              name="maximumTerm"
              label="Kỳ hạn gửi tiết kiệm tối đa (tối đa 24)"
              placeholder="-1 nếu không giới hạn thời gian gửi"
              rules={[
                { required: true, message: 'Bắt buộc!' },
                {
                  max: 24,
                  message: 'Kỳ hạn tối đa là 24 (-1 nếu không giới hạn)',
                },
                { type: 'number', transform: (value) => Number(value) },
              ]}
            />
          </>
        )}
      </StepsForm.StepForm>

      {/* BƯỚC 3: Xác nhận & Gửi */}
      <StepsForm.StepForm 
        name="isActive" 
        title="Hoạt động" 
        content='Cho phép lãi suất này đi vào hoạt động ngay lập tức?'
      >
        <p>Cho phép lãi suất này đi vào hoạt động ngay lập tức?</p>
        <ProFormSwitch name="isActive" initialValue={true} />
      </StepsForm.StepForm>
    </StepsForm>
  );
}

export default CreateRateForm;