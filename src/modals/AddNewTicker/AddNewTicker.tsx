import { FC, MouseEvent } from "react";
import { Modal } from "antd";

interface AddNewTickerProps {
  open: boolean;
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AddNewTicker: FC<AddNewTickerProps> = ({ open, onOk, onCancel }) => {
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
      <p>Add new ticker</p>
    </Modal>
  );
};

export default AddNewTicker;
