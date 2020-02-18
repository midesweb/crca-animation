import { css } from "lit-element";

export const rotateInDownLeft = css` @keyframes rotateInDownLeft {
  from {
    transform-origin: left bottom;
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }

  to {
    transform-origin: left bottom;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateInDownLeft {
  animation-name: rotateInDownLeft;
}
`;
