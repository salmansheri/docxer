import { FC } from "react";
import { ClimbingBoxLoader } from "react-spinners";

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader: FC<LoaderProps> = ({ size = 15, className }) => {
  return (
    <div className={className}>
      <ClimbingBoxLoader size={size} color="#e11d48" />
    </div>
  );
};

export default Loader;
