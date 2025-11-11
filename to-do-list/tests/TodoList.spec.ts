import TodoList from '../src/components/TodoList.vue';
import TodoInput from '../src/components/TodoInput.vue';
import TodoItem from '../src/components/TodoItem.vue';
import {shallowMount} from '@vue/test-utils';

describe('TodoList', () => {
    it('should add new todos with unique id, text and completed:false', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);
        
        // Act
        await todoInput.vm.$emit('add-todo', 'Eten koken');
        const todos = wrapper.findAllComponents(TodoItem);

        // Assert
        expect(wrapper.getByDataTest('todo-list').exists()).toBe(true);
        expect(todos[0].exists()).toBe(true);
        expect(todos[0].props('todo')).toEqual({
            id: 1,
            text: 'Eten koken',
            completed: false,
        });

        it('should delete todos when a delete event is triggered', async () => {
            // Arrange
            const wrapper = shallowMount(TodoList);
            const todos = wrapper.findAllComponent()
        })

    
    })
})
