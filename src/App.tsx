import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { useInView } from "react-intersection-observer";
import cn from "classnames";

import Initializer from "components/Initializer/Initializer";
import Header from "components/Header/Header";
import TickerCardsList from "components/TickerCardsList/TickerCardsList";
import AddTickerButton from "components/AddTickerButton/AddTickerButton";
import AddNewTickerModal from "modals/AddNewTickerModal/AddNewTickerModal";
import styles from "./App.module.css";

import type { Period } from "types";

const queryClient = new QueryClient();

function App() {
  const [addTickerModalOpen, setAddTickerModalOpen] = useState(false);
  const [addTickerButtonHidden, setAddTickerButtonHidden] = useState(true);
  const handleOk = () => setAddTickerModalOpen(false);
  const handleCancel = () => setAddTickerModalOpen(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) setAddTickerButtonHidden(true);
      else setAddTickerButtonHidden(false);
    },
  });
  const periodState = useState<Period>("month");

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#ec9706" } }}>
        <Initializer />
        <Header
          ref={ref}
          setAddTickerModalOpen={setAddTickerModalOpen}
          periodState={periodState}
        />
        <TickerCardsList period={periodState[0]} />
        <AddTickerButton
          className={cn(styles.addTickerButton, {
            [styles.hidden]: addTickerButtonHidden,
          })}
          setAddTickerModalOpen={setAddTickerModalOpen}
        />
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
