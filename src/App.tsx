import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import Header from "components/Header/Header";
import TickerCardsList from "components/TickerCardsList/TickerCardsList";
import Temp from "Temp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
        <Header />
        <TickerCardsList />
        <Temp />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
