import { ConfigProvider } from "antd";
import Header from "components/Header/Header";
import TickerCardsList from "components/TickerCardsList/TickerCardsList";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
      <Header />
      <TickerCardsList />
    </ConfigProvider>
  );
}

export default App;
