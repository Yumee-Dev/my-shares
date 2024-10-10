import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import formatDate from "utils/formatDate";
import { lastMonth, today } from "data";
import styles from "./Header.module.css";

import type { FC, Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setAddTickerModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setAddTickerModalOpen }) => {
  return (
    <header className={styles.header}>
      <div className={styles.topline}>
        <h1>myShares</h1>
      </div>
      <div className={styles.subheader}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAddTickerModalOpen(true)}
        >
          Add Ticker
        </Button>

        <h2>
          Period: <span>{formatDate(lastMonth)}</span> -&nbsp;
          <span>{formatDate(today)}</span>
        </h2>
      </div>
    </header>
  );
};

export default Header;
