import App from './App';

import { shallow } from 'enzyme';

it('Renders the App component without error', () => {
    const wrapper = shallow(<App />);
});

it('Renders an increment button', () => {
    // Arrange and Act
    const wrapper = shallow(<App />);

    // find is like querySelectorAll
    const button = wrapper.find('[data-test="increment-button"]');

    // Assert
    expect(button.length).toBe(1);
});

it('Starts the value of the counter at 0', () => {
    // Arrange and Act
    const wrapper = shallow(<App />);

    const counter = wrapper.find('[data-test="count"]');
    const counterVal = counter.text();
    // const counterVal = wrapper.find('[data-test=count').text();

    // Assert
    expect(counterVal).toBe('0');
});

it('Increases the counter when the increment button is clicked', () => {
    // Arrange
    const wrapper = shallow(<App />);
    const button = wrapper.find('[data-test="increment-button"]');

    // Act
    button.simulate('click');

    const counterVal = wrapper.find('[data-test="count"]').text();

    expect(counterVal).toBe('1');
});

it('Renders a counter display', () => {
    const wrapper = shallow(<App />);
    const counterDisplay = wrapper.find('[data-test="count"]');

    expect(counterDisplay).toBeInTheDocument();
    expect(counterDisplay.text()).toBe('0');
});

it('Renders an decrement button', () => {
    // Arrange and Act
    const wrapper = shallow(<App />);

    // find is like querySelectorAll
    const button = wrapper.find('[data-test="decrement-button"]');

    // Assert
    expect(button.length).toBe(1);
});

// Because the counter can't go below zero, we'll need to
//   click increment button to increase it to 1.
//   might as well at that point confirm that it's 1.
//   click decrement button to decrease it back to 0.
//   confirm that the counter is 0.
it('Decreases the counter when the decrement button is clicked', () => {
    // Arrange
    const wrapper = shallow(<App />);
    const button = wrapper.find('[data-test="increment-button"]');

    // Act
    button.simulate('click');

    const counterVal = wrapper.find('[data-test="count"]').text();

    expect(counterVal).toBeGreaterThan('0');
    expect(counterVal).toBe('1');

    const downButton = wrapper.find('[data-test="decrement-button"]');
    downButton.simulate('click');

    const updatedCounterVal = wrapper.find('[data-test="count"]').text();

    expect(updatedCounterVal).toBe('0');
});

it('should stay at zero when we click decrement and the counter was already zero and it should display an error', () => {
    // set to zero in the place... when I render the App component, it should start the counter at 0. Let's confirm that
    const wrapper = shallow(<App />);
    const counterDisplay = wrapper.find('[data-test="count"]');

    expect(counterDisplay.text()).toBe('0');

    const downButton = wrapper.find('[data-test="decrement-button"]');
    downButton.simulate('click');
    expect(counterDisplay.text()).toBe('0');

    const errorMessage = wrapper.find('[data-test="error-message"]');
    expect(errorMessage.text()).toBe(
        'The counter was already zero and you clicked decrement. What. Are. You. Trying. To. Do to me???!?!?'
    );
});

it('should clear the error message when clicking on the increment button while the error is displayed', () => {
    const wrapper = shallow(<App />);

    const downButton = wrapper.find('[data-test="decrement-button"]');
    downButton.simulate('click');

    const errorMessage = wrapper.find('[data-test="error-message"]');
    expect(errorMessage.text()).toBe(
        'The counter was already zero and you clicked decrement. What. Are. You. Trying. To. Do to me???!?!?'
    );

    const button = wrapper.find('[data-test="increment-button"]');

    // Act
    button.simulate('click');
    expect(errorMessage.text()).toBe('');
});
