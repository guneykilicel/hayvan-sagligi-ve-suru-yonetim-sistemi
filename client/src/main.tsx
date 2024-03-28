import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react-query'den gerekli bileşenleri içe aktarıyoruz
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

// QueryClient instance oluşturuluyor
const queryClient = new QueryClient();

// Ardından uygulamanızın kök bileşenini QueryClientProvider ile sarmalıyorsunuz
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* QueryClientProvider ekliyoruz ve client prop'uyla QueryClient örneğini sağlıyoruz */}
      <ThemeProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
