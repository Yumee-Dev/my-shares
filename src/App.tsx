import { useCallback, useEffect, useState, MouseEvent } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import getCandles from "api/getCandles";
import getTickers from "storage/getTickers";
import TickerCard from "components/TickerCard/TickerCard";
import AddNewTicker from "modals/AddNewTicker/AddNewTicker";

const today = new Date();

const lastMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 30,
  today.getHours()
);

export type Candle = {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
};

function App() {
  const [data, setData] = useState<Candle[][]>([]);
  const [addTickerModalOpen, setAddTickerModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getCandles({
        startDate: lastMonth,
        endDate: today,
        tickers: getTickers(),
      });

      setData(fetchedData);
    }

    fetchData();
  }, []);

  const showAddTickerModal = useCallback(() => {
    setAddTickerModalOpen(true);
  }, []);

  const handleOk = () => {
    setAddTickerModalOpen(false);
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    setAddTickerModalOpen(false);
  };

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
      <AddNewTicker
        open={addTickerModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <h2>
        Period: <span>{lastMonth.toISOString().split("T")[0]}</span> -&nbsp;
        <span>{today.toISOString().split("T")[0]}</span>
      </h2>
      {data.length > 0 && (
        <div style={{ display: "flex" }}>
          {data.map((oneTickerData) => (
            <TickerCard data={oneTickerData} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
