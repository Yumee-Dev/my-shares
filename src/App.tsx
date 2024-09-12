import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import Header from "components/Header/Header";
import TickerCardsList from "components/TickerCardsList/TickerCardsList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
        <Header />
        <TickerCardsList />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
