import { FC, MouseEvent } from "react";
import { Modal, Form, Input } from "antd";

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
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item<FieldType>
          label="Enter ticker"
          name="ticker"
          rules={[{ required: true, message: "Please input a ticker!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewTickerModal;
