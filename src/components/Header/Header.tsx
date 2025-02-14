import { forwardRef, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import cn from "classnames";

import usePeriodAtom from "atoms/periodAtom";
import getPeriodStart from "utils/getPeriodStart";
import formatDate from "utils/formatDate";
import styles from "./Header.module.css";

import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setAddTickerModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ setAddTickerModalOpen }, ref) => {
    const [scrolledOut, setScrolledOut] = useState(false);
    const [period, setPeriod] = usePeriodAtom();
    const periodEnd = new Date();
    const periodStart = getPeriodStart(periodEnd, period);

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
          <Flex justify="space-between">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddTickerModalOpen(true)}
            >
              Add Ticker
            </Button>

            <Flex justify="space-between" gap="small">
              <Button onClick={() => setPeriod("week")}>Week</Button>
              <Button onClick={() => setPeriod("month")}>Month</Button>
              <Button onClick={() => setPeriod("year")}>Year</Button>
            </Flex>
          </Flex>

          <div className={styles.period}>
            Period: <span>{formatDate(periodStart)}</span> -&nbsp;
            <span>{formatDate(periodEnd)}</span>
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
