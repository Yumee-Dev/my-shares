import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import AddNewTickerModal from "modals/AddNewTickerModal/AddNewTickerModal";
import { lastMonth, today } from "data";

import type { FC } from "react";

const Header: FC = () => {
  const [addTickerModalOpen, setAddTickerModalOpen] = useState(false);
  const showAddTickerModal = () => setAddTickerModalOpen(true);
  const handleOk = () => setAddTickerModalOpen(false);
  const handleCancel = () => setAddTickerModalOpen(false);

  return (
    <div>
      <h1>myShares</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddTickerModal}
      >
        Add Ticker
      </Button>
      <AddNewTickerModal
        open={addTickerModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <h2>
        Period: <span>{lastMonth.toISOString().split("T")[0]}</span> -&nbsp;
        <span>{today.toISOString().split("T")[0]}</span>
      </h2>
    </div>
  );
};

export default Header;
