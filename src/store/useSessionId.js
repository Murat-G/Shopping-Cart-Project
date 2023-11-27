import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionId = create(
  persist(
    (set) => ({
      sessionId: false,
      setSessionId: (params) => {
        set(() => ({
          sessionId: params,
        }));
      },
      getSession: async () => {
        const sessionUrl =
          "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/createsession";
        try {
          const sessionResponse = await axios.post(sessionUrl);
          set({ sessionId: sessionResponse?.data });
        } catch (error) {
          if (error instanceof AxiosError) {
            const status = error.response.status;
            if (status === 403) {
              console.log("error");
            }
          }
        }
      },
    }),
    { name: "sessionId" }
  )
);
export default useSessionId;
