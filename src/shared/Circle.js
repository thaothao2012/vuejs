import styled from 'vue-styled-components';
import { animationDuration } from "../shared/variables";
import { lightGray } from "../shared/colors";

export default styled.circle`
  cursor: pointer;
  fill: ${props => (props.hovered ? lightGray : "transparent")};
  stroke-width: 1;
  stroke: black;
  transition: fill ${animationDuration};
`;