import React, { FC } from 'react';
import styled from 'styled-components';

export interface HelloWorldProps {
  name: string;
}

const HelloWorld: FC<HelloWorldProps> = ({ name }) => {
  return <Hello>hello {name}</Hello>;
};

export default HelloWorld;

const Hello = styled.p`
  color: blue;
`;
