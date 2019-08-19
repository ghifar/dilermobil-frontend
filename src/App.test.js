import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//renderer
import renderer from 'react-test-renderer';
import AddCar from "./components/AddCar";


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a snapshot', function () {
  const tree= renderer.create(<AddCar/>).toJSON();
  expect(tree).toMatchSnapshot();
});
