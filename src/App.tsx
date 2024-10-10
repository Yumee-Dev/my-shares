import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

import Initializer from "components/Initializer/Initializer";
import Header from "components/Header/Header";
import TickerCardsList from "components/TickerCardsList/TickerCardsList";
import AddTickerButton from "components/AddTickerButton/AddTickerButton";
import AddNewTickerModal from "modals/AddNewTickerModal/AddNewTickerModal";

const queryClient = new QueryClient();

function App() {
  const [addTickerModalOpen, setAddTickerModalOpen] = useState(false);
  const handleOk = () => setAddTickerModalOpen(false);
  const handleCancel = () => setAddTickerModalOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
        <Initializer />
        <Header setAddTickerModalOpen={setAddTickerModalOpen} />
        <TickerCardsList />
        <AddTickerButton setAddTickerModalOpen={setAddTickerModalOpen} />
        <AddNewTickerModal
          open={addTickerModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
