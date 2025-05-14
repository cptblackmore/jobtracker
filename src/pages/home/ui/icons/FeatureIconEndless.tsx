import { SvgIcon } from "@mui/material";

interface Props {
  size?: string;
  color?: string;
}

export const FeatureIconEndless: React.FC<Props> = ({
  size = "3em",
  color = "#fff",
}) => {
  return (
    <SvgIcon sx={{ fontSize: size }}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`.a{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;}`}
          </style>
        </defs>
        <path
          className="a"
          d="M20.2688,28.2021l-1.5169,1.7087a8.3516,8.3516,0,1,1,0-11.8216L29.2481,29.9108a8.3516,8.3516,0,1,0,0-11.8216l-1.5169,1.7087"
        />
      </svg>
    </SvgIcon>
  );
};
