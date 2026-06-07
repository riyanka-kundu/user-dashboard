import HistoryPage from "@/components/user/history";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<h3>loading...</h3>}>
      <HistoryPage />;
    </Suspense>
  );
};

export default page;
