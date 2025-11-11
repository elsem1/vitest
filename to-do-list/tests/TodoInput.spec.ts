import TodoInput from '../src/components/TodoInput.vue';
import {shallowMount} from '@vue/test-utils';

describe('TodoInput', () => {
    it('should render an input field where you can type a task you want to add', () => {
        // Arrange 
        const wrapper = shallowMount(TodoInput);
        const newTodo = 'A new task';
        const input = wrapper.getByDataTest('todo-input');

        // Act 
        input.setValue(newTodo);

        // Assert
        expect(wrapper.getByDataTest('todo-input').exists()).toBe(true);
        expect(input.element.value).toContain(newTodo);        
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

    it('should disable button when input is empty', () => {
        // Arrange 
        const wrapper = shallowMount(TodoInput);
        const button = wrapper.getByDataTest('add-button');

        // Assert 
        expect((button.element as HTMLButtonElement).disabled).toBe(true);
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