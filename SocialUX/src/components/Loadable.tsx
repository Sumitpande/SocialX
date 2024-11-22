import { FC, Suspense } from "react";
import LoadingSpin from "@/components/LoadingSpin";

const Loadable = (Component: FC) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<LoadingSpin />}>
      <Component {...props} />
    </Suspense>
  );
export default Loadable;
