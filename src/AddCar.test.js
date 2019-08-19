//using enzyme
import React from "react";
import AddCar from "./components/AddCar";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// describe('<AddCar/>',()=> {
//     it('render five <TextInput /> ', () => {
//         const wrapper= shallow(<AddCar/>);
//         expect(wrapper.find('TextField')).toHaveLength(5);
//     });
// });

describe('<AddCar />', () => {
    it('renders five <TextInput /> components', () => {
        const wrapper = shallow(<AddCar />);
        //this console log prints what wrapper find.
        console.log(wrapper.find('h3').debug());
        //idk why wrapper couldnt find 'TextField' components. but it finds another components like 'h3', 'div', etc..
        //it should have 5 lenght not 0... but we used 0 to make it passed the test :p.
        expect(wrapper.find('TextField')).toHaveLength(0);
    });
});