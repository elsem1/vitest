import TodoItem from '../src/components/TodoItem.vue'
import {shallowMount} from '@vue/test-utils';

describe('TodoItem', () => {
    it('should render item on the todo list', () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: {
                todo: {
                id: 5,
                text: 'Moeilijke taak',
                completed: false,
                }
            }
        });

        // Assert
        expect(wrapper.getByDataTest('todo-item').exists()).toBe(true);
        expect(wrapper.getByDataTest('todo-text').text()).toBe('Moeilijke taak');
    });

    it('should render unchecked checkbox when not completed', () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: {
                todo: { 
                    id: 1, 
                    text: 'Wereld overnemen', 
                    completed: false }
            }
        });

        // Act
        const checkbox = wrapper.getByDataTest('todo-checkbox');

        // Assert
        expect((checkbox.element as HTMLInputElement).checked).toBe(false);
    });

    it('should render completed todo when checkbox is checked', () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: {
                todo: {
                    id: 56,
                    text: 'Planten water geven',
                    completed: true  
                }
            }
        });

        const todoText = wrapper.getByDataTest('todo-text');

        // Assert 
        expect(todoText.text()).toBe('Planten water geven');
        expect(todoText.classes()).toContain('completed');
    });

    it('should emit a toggle when checkbox is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: {
                todo: {
                id: 5,
                text: 'Moeilijke taak',
                completed: false,
                }
            }
        });
        
        // Act
        const checkbox = wrapper.getByDataTest('todo-checkbox');
        await checkbox.trigger('change');

        // Assert
        expect(wrapper.emitted('toggle')).toBeDefined();
        expect(wrapper.emitted('toggle')?.[0]).toEqual([5]);       
    });

    it('should emit a toggle when checkbox is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: {
                todo: {
                id: 5,
                text: 'Moeilijke taak',
                completed: false,
                }
            }
        });
        
        // Act
        const checkbox = wrapper.getByDataTest('todo-checkbox');
        await checkbox.trigger('change');

        // Assert
        expect(wrapper.emitted('toggle')).toBeDefined();
        expect(wrapper.emitted('toggle')?.[0]).toEqual([5]);        
    });

    it('should emit a delete event when delete button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: {
                todo: {
                id: 5,
                text: 'Moeilijke taak',
                completed: false,
                }
            }
        });

        // Act
        const deleteButton = wrapper.getByDataTest('delete-button');
        await deleteButton.trigger('click');

        // Assert  
        expect(wrapper.emitted('delete')).toBeDefined();      
        expect(wrapper.emitted('delete')?.[0]).toEqual([5]);
        expect(wrapper.emitted('delete')?.[0]).toHaveLength(1);
    });
})