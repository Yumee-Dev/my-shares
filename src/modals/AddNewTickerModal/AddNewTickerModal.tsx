import { useRef, useState } from "react";
import { Modal, Form, AutoComplete, Space, Button } from "antd";
import useTickersDictionaryAtom from "atoms/tickersDictionaryAtom";
import useTickersAtom from "atoms/tickersAtom";
import SubmitButton from "./elements/SubmitButton";
import styles from "./AddNewTickerModal.module.css";

import type { FC } from "react";
import type { AutoCompleteProps, RefSelectProps } from "antd";

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
  const [tickersDictionary] = useTickersDictionaryAtom();
  const { add: addTicker } = useTickersAtom();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>(
    tickersDictionary.map((currentTicker) => ({ value: currentTicker.ticker }))
  );
  const [tickerInfo, setTickerInfo] = useState("");
  const tickerInputRef = useRef<RefSelectProps>(null);

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

  const handleChange = (ticker: string) => {
    const tickerInDictionary = tickersDictionary.find(
      (currentTicker) => currentTicker.ticker === ticker.toUpperCase()
    );

    if (tickerInDictionary) setTickerInfo(tickerInDictionary.name);
  };

  return (
    <Modal
      title="Add Ticker"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      afterOpenChange={(open) => open && tickerInputRef.current?.focus()}
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
            {
              required: true,
              min: 2,
              pattern: new RegExp(
                `${tickersDictionary.map((ticker) => ticker.ticker).join("|")}`
              ),
              message: "Please input a ticker!",
            },
          ]}
        >
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onChange={handleChange}
            ref={tickerInputRef}
          />
        </Form.Item>
        <div className={styles.tickerInfo}>{tickerInfo}</div>
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
