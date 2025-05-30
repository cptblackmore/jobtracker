import { SvgIcon } from "@mui/material";

interface Props {
  size?: string;
  color?: string;
}

export const FeatureIconFavorite: React.FC<Props> = ({
  size = "3em",
  color = "#fff",
}) => {
  return (
    <SvgIcon sx={{ fontSize: size }}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 48 48"
        id="a"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`.d{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;}`}
          </style>
        </defs>
        <path
          id="b"
          className="d"
          d="m20.3465,18.4788c-2.407-.0007-4.3589,1.95-4.3596,4.3571-.0003,1.0026.3451,1.9747.978,2.7523h-.0022l6.9857,8.1984,6.9166-8.117.0344-.0408.0352-.0407h-.0034c1.5203-1.8663,1.2397-4.6117-.6266-6.132-1.8663-1.5203-4.6117-1.2397-6.132.6266-.0797.0978-.1551.1991-.226.3035-.8109-1.1918-2.1584-1.9058-3.5999-1.9075h-.0003Z"
        />
        <path
          id="c"
          className="d"
          d="m6.6797,8.8047c-1.2016-.0019-2.1773.9703-2.1797,2.1719v26.0391c-.0019,1.2019.9708,2.1778,2.1727,2.1797h34.6476c1.2016.0019,2.1773-.9703,2.1797-2.1719V14.8652c.0003-1.0061-.815-1.822-1.8211-1.8223h-16.9093c-1.9628-.1072-5.9305-4.2363-8.1875-4.2363H6.6797v-.002Z"
        />
      </svg>
    </SvgIcon>
  );
};
