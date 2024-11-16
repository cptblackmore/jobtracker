import { useRef } from "react";
import { Transition } from "react-transition-group";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { css, IconButton } from "@mui/material";

const duration = 200;
const size = 1.2;

const wrapperStyle = css`
  position: relative;
  cursor: pointer;
  height: ${size}em;
  width: ${size}em;
  `
const iconStyle = css`
  transition: opacity ${duration}ms ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: ${size}em;
  width: ${size}em;
`
const transitionStyles = {
  entering: css`
    opacity: 1; 
  `,
  entered: css`
    opacity: 1;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
  unmounted: css`
    opacity: 0;
  `
}

interface Props {
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
}

const FavoriteButton: React.FC<Props> = ({ isFavorite, setIsFavorite }) => {
  const favoriteRef = useRef(null);
  const favoriteBorderRef = useRef(null);

  return (
    <IconButton
      css={wrapperStyle}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      <Transition 
        nodeRef={favoriteRef} 
        in={isFavorite} 
        timeout={duration}
      >
        {state => (
          <Favorite 
            ref={favoriteRef} 
            css={[
              iconStyle,
              transitionStyles[state]
            ]}
            color='primary'
          />
        )}
      </Transition>
      <Transition 
        nodeRef={favoriteBorderRef} 
        in={!isFavorite} 
        timeout={duration}
      >
        {state => (
          <FavoriteBorder 
            ref={favoriteBorderRef} 
            css={[
              iconStyle,
              transitionStyles[state]
            ]}
          />
        )}
      </Transition>
    </IconButton>
  )
}

export default FavoriteButton;