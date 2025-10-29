import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Greeting from '../../src/components/Greeting.vue'

describe('Greeting', () => {
    it('should render the name prop', () => {
        // Arrange
        const name = 'Vitest';

        // Act
        const wrapper = shallowMount(Greeting, { props: { name } });

        // Assert
        expect(wrapper.text()).toContain('Hello, Vitest!');
    });
    it('should render the emoji prop when added', () => {
        // Arrange
        const name = 'Vitest';
        const emoji = '👋';

        // Act 
        const wrapper = shallowMount(Greeting, {props: {name, emoji} });

        //Assert
        expect(wrapper.text()).toContain('Hello, Vitest!👋');
    });
    it('should render only the name prop when emoji is empty', () => {
        // Arrange
        const name = 'Vitest';
        const emoji = '';

        // Act
        const wrapper = shallowMount(Greeting, { props: { name, emoji } });

        // Assert
        expect(wrapper.text()).toContain('Hello, Vitest!');        
    });
    it('should not render emoji when prop is not provided', () => {
        // Arrange
        const name = 'Vitest';
        const emoji = '👋';

        // Act
        const wrapper = shallowMount(Greeting, { props: { name } });

        // Assert
        expect(wrapper.text()).toContain('Hello, Vitest!');
        expect(wrapper.text()).not.toContain('👋');
    });
});