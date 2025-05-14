import { SvgIcon } from "@mui/material";

interface Props {
  size?: string;
  color?: string;
}

export const FeatureIconFast: React.FC<Props> = ({
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
          d="M40.1925,32.609H43.5a19.5,19.5,0,0,0-39,0H7.8075"
        />
        <path
          className="a"
          d="M37.9144,32.609A13.9144,13.9144,0,0,0,24,18.6946"
        />
        <path
          className="a"
          d="M31.6329,32.609A7.6329,7.6329,0,0,0,24,24.9762"
        />
        <circle className="a" cx={24} cy={32.609} r={2.2819} />
        <line className="a" x1={24} y1={30.3271} x2={24} y2={14.7861} />
      </svg>
    </SvgIcon>
  );
};
