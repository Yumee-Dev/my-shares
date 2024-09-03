import { FC } from "react";
import { Modal, Form, Input, Space, Button } from "antd";
import useTickersStore from "stores/tickersStore";
import SubmitButton from "./elements/SubmitButton";

type FieldType = {
  ticker?: string;
};

interface AddNewTickerModalProps {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const AddNewTickerModal: FC<AddNewTickerModalProps> = ({
  open,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { add: addTicker } = useTickersStore((state) => state);

  const handleOk = (values: FieldType) => {
    if (!values.ticker) return;

    addTicker(values.ticker);

    if (onOk) onOk();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <Modal
      title="Add Ticker"
      open={open}
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
