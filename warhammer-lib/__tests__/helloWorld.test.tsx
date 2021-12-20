import { shallow } from 'enzyme';
import React from 'react';
import HelloWorld from '../src/components/HelloWorld/HelloWorld';

describe('try helloWorld component', () => {
  test('test hello World', async () => {
    const helloWorldComponent = shallow(<HelloWorld name="World" />);
    expect(helloWorldComponent.text()).toEqual('hello World');
  });
});
