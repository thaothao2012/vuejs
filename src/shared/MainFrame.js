import styled from 'vue-styled-components';
import { lightGray } from './colors';

export default styled.div`
  border: 1px solid ${lightGray};
  display: flex;
  flex-direction: column;
  height: 300px;
  padding: 0.5rem;
  position: relative;
  width: 400px;
`;
