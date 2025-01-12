import { FC } from "react";
import { PropagateLoader } from "react-spinners";

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader: FC<LoaderProps> = ({ size = 15, className }) => {
  return (
    <div className={className}>
      <PropagateLoader size={size} color="#e11d48" />
    </div>
  );
};

export default Loader;
