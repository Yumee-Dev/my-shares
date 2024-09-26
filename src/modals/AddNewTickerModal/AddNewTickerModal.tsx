import { useEffect, useState } from "react";
import { Modal, Form, AutoComplete, Space, Button } from "antd";
import useTickersStore from "stores/tickersStore";
import SubmitButton from "./elements/SubmitButton";

import type { FC } from "react";
import type { AutoCompleteProps } from "antd";

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
  const { add: addTicker, tickersDictionary } = useTickersStore(
    (state) => state
  );
  const [options, setOptions] = useState<AutoCompleteProps["options"]>(
    tickersDictionary.map((currentTicker) => ({ value: currentTicker.ticker }))
  );

  const handleOk = (values: FieldType) => {
    if (!values.ticker) return;

    addTicker(values.ticker.toUpperCase());

    if (onOk) onOk();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleSearch = (text: string) => {
    setOptions(
      tickersDictionary
        .map((currentTicker) => ({ value: currentTicker.ticker }))
        .filter((option) => option.value.startsWith(text.toUpperCase()))
    );
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
          <AutoComplete options={options} onSearch={handleSearch} />
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
