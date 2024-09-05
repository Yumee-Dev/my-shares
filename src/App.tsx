import { ConfigProvider } from "antd";
import TickerCardsList from "components/TickerCardsList/TickerCardsList";
import Header from "components/Header/Header";
import useCandles from "hooks/useCandles";

function App() {
  const data = useCandles();

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
      <Header />
      {data.length > 0 && <TickerCardsList data={data} />}
    </ConfigProvider>
  );
}

export default App;
