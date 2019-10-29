import styled from 'vue-styled-components';
import Button from "./Button";

export default styled.div`
flex: 0 0 auto;
padding-bottom: 0.5rem;
text-align: center;

${Button} + ${Button} {
  margin-left: 0.5rem;
}
`;