import { FC, MouseEvent } from "react";
import { Modal, Form, Input, Space, Button } from "antd";
import SubmitButton from "./elements/SubmitButton";

type FieldType = {
  ticker?: string;
};

interface AddNewTickerModalProps {
  open: boolean;
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AddNewTickerModal: FC<AddNewTickerModalProps> = ({
  open,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = (e: MouseEvent<HTMLButtonElement>) => {
    if (onOk) onOk(e);
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    if (onCancel) onCancel(e);
  };

  return (
    <Modal
      title="Add Ticker"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        name="basic"
        form={form}
        preserve={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleOk}
      >
        <Form.Item<FieldType>
          label="Enter ticker"
          name="ticker"
          rules={[
            { required: true, min: 2, message: "Please input a ticker!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form}>Add</SubmitButton>
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewTickerModal;
