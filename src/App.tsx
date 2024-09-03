import { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import getCandles from "api/getCandles";
import getTickers from "storage/getTickers";
import useTickersStore from "stores/tickersStore";
import TickerCard from "components/TickerCard/TickerCard";
import AddNewTickerModal from "modals/AddNewTickerModal/AddNewTickerModal";

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
  const [data, setData] = useState<{ ticker: string; candles: Candle[] }[]>([]);
  const [addTickerModalOpen, setAddTickerModalOpen] = useState(false);
  const { tickers, add: addTickers } = useTickersStore((state) => state);

  useEffect(() => {
    addTickers(getTickers());
  }, [addTickers]);

  useEffect(() => {
    if (tickers.length === 0) return;

    async function fetchData() {
      const fetchedData = await getCandles({
        startDate: lastMonth,
        endDate: today,
        tickers,
      });

      setData(fetchedData);
    }

    fetchData();
  }, [tickers]);

  const showAddTickerModal = useCallback(() => {
    setAddTickerModalOpen(true);
  }, []);

  const handleOk = () => {
    setAddTickerModalOpen(false);
  };

  const handleCancel = () => {
    setAddTickerModalOpen(false);
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
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
        {data.length > 0 && (
          <div style={{ display: "flex" }}>
            {data.map((oneTickerData) => (
              <TickerCard
                ticker={oneTickerData.ticker}
                data={oneTickerData.candles}
              />
            ))}
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
