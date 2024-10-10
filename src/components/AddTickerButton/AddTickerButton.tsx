import { FloatButton } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";

import type { FC, Dispatch, SetStateAction } from "react";

interface AddTickerButtonProps {
  className?: string;
  setAddTickerModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddTickerButton: FC<AddTickerButtonProps> = ({
  className,
  setAddTickerModalOpen,
}) => {
  return (
    <FloatButton
      className={className}
      shape="circle"
      type="primary"
      icon={<AppstoreAddOutlined />}
      onClick={() => setAddTickerModalOpen(true)}
    />
  );
};

export default AddTickerButton;
