import { forwardRef, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cn from "classnames";

import formatDate from "utils/formatDate";
import { lastMonth, today } from "data";
import styles from "./Header.module.css";

import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setAddTickerModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ setAddTickerModalOpen }, ref) => {
    const [scrolledOut, setScrolledOut] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) setScrolledOut(true);
        else setScrolledOut(false);
      };

      document.addEventListener("scroll", handleScroll);

      return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <header ref={ref} className={styles.header}>
        <div
          className={cn(styles.topline, { [styles.scrolledOut]: scrolledOut })}
        >
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

          <div className={styles.period}>
            Period: <span>{formatDate(lastMonth)}</span> -&nbsp;
            <span>{formatDate(today)}</span>
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
