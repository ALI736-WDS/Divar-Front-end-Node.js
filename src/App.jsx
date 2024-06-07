import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Toast
import { Toaster } from "react-hot-toast";

//Components
import Layouts from "./layouts/Layouts";
import Router from "./router/Router";

//Functions
import defaultOptions from "./configs/reactQuery";

function App() {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layouts>
          <Router />
          <Toaster />
        </Layouts>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

//Number ADMIN : 09189990099
