import TodoInput from '../../src/components/TodoInput.vue';
import {shallowMount} from '@vue/test-utils';

describe('TodoInput', () => {    
    it('should render an input field', () => {
        // Arrange 
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.getByDataTest('todo-input');

        // Assert
        expect(input.exists()).toBe(true);
    });

    it('should update input value when typing', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.getByDataTest('todo-input');
        
        // Act
        await input.setValue('A new task');        
        
        // Assert
        expect((input.element as HTMLInputElement).value).toBe('A new task');
    });

    it('should render a submit button that handles an emit when form is submitted', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.getByDataTest('todo-input');
        const form = wrapper.getByDataTest('todo-form');          

        // Act
        await input.setValue('Belangrijke taak');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('add-todo')?.[0]).toEqual(['Belangrijke taak']);
    });

    it('should clear input field after submit', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.getByDataTest('todo-input');
        const form = wrapper.getByDataTest('todo-form');

        // Act
        await input.setValue('Belangrijke taak');
        await form.trigger('submit');

        // Arrange
        expect((input.element as HTMLInputElement).value).toBe('');
    });

    it('should disable button when input is empty', () => {
        // Arrange 
        const wrapper = shallowMount(TodoInput);
        const button = wrapper.getByDataTest('add-button');

        // Assert 
        expect((button.element as HTMLButtonElement).disabled).toBe(true);
    });

    it('should not emit event when input is empty', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const form = wrapper.getByDataTest('todo-form');

        // Act
        await form.trigger('submit');
        
        // Assert
        expect(wrapper.emitted('add-todo')).toBeUndefined();
    });

    it('should disable button when input is only whitespace', async () => {
        // Arrange 
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.getByDataTest('todo-input');
        const button = wrapper.getByDataTest('add-button');

        // Act 
        await input.setValue('   ');

        // Assert 
        expect((button.element as HTMLButtonElement).disabled).toBe(true);
    });
});