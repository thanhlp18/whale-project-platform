// // src/components/Loader.tsx
import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <LineWave
      visible={true}
      height="150"
      width="150"
      color="#f76f12"
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
    />
  );
};

export default Loader;