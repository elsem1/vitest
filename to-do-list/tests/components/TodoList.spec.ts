import TodoList from '../../src/components/TodoList.vue';
import TodoInput from '../../src/components/TodoInput.vue';
import TodoItem from '../../src/components/TodoItem.vue';
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
        expect(todos[0].exists()).toBe(true);
        expect(todos).toHaveLength(1);
        expect(todos[0].props('todo')).toEqual({
            id: 1,
            text: 'Eten koken',
            completed: false,
        });       
    });

    it('should give new task id: 1, the second id: 2, ect.', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);
        
        // Act
        await todoInput.vm.$emit('add-todo', 'Task 1');
        await todoInput.vm.$emit('add-todo', 'Task 2');
        await todoInput.vm.$emit('add-todo', 'Task 3');
        await todoInput.vm.$emit('add-todo', 'Task 4');
        const todos = wrapper.findAllComponents(TodoItem);

        // Assert        
        expect(todos[0].props('todo')).toHaveProperty( 'id', 1 );
        expect(todos[1].props('todo')).toHaveProperty( 'id', 2 );
        expect(todos[2].props('todo')).toHaveProperty( 'id', 3 );
        expect(todos[3].props('todo')).toHaveProperty( 'id', 4 );       
    });

    it('should delete todos when a delete event is triggered', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);
        
        await todoInput.vm.$emit('add-todo', 'Eten koken');
        let todos = wrapper.findAllComponents(TodoItem);

        expect(todos).toHaveLength(1);
        
        // Act
        const todoId = todos[0].props('todo').id;
        await todos[0].vm.$emit('delete', todoId);

        // Assert
        todos = wrapper.findAllComponents(TodoItem);
        expect(todos).toHaveLength(0);
    });

    it('should toggle the completed status when toggle event is triggered', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Eten koken');
        let todos = wrapper.findAllComponents(TodoItem);

        expect(todos).toHaveLength(1);
        expect(todos[0].props('todo')).toEqual({
            id: 1,
            text: 'Eten koken',
            completed: false,
        });    
        
        // Act
        const todoId = todos[0].props('todo').id;
        await todos[0].vm.$emit('toggle', todoId);

        // Assert
        todos = wrapper.findAllComponents(TodoItem);
        expect(todos[0].props('todo')).toEqual({
            id: 1,
            text: 'Eten koken',
            completed: true,
        });         
    });

    it('should show filter all as the default' , async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Eten koken');            

        // Act
        const filterAllButton = wrapper.getByDataTest('filter-all');
        const filterActiveButton = wrapper.getByDataTest('filter-active');
        const filterCompletedButton = wrapper.getByDataTest('filter-completed');  
        
        // Assert
        expect(filterAllButton.classes()).toContain('active');
        expect(filterActiveButton.classes()).not.toContain('active');
        expect(filterCompletedButton.classes()).not.toContain('active');
    });

    it('should show all todos when filter is on all', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Active 1');
        await todoInput.vm.$emit('add-todo', 'Completed 1');
        await todoInput.vm.$emit('add-todo', 'Active 2');
        await todoInput.vm.$emit('add-todo', 'Completed 2');

        let todos = wrapper.findAllComponents(TodoItem);            
        await todos[1].vm.$emit('toggle', 2);
        await todos[3].vm.$emit('toggle', 4);

        // Act
        const filterAllButton = wrapper.getByDataTest('filter-all');
        await filterAllButton.trigger('click');
        
        // Assert                
        const visibleTodos = wrapper.findAllComponents(TodoItem);   
        expect(visibleTodos).toHaveLength(4);
        expect(visibleTodos[0].props('todo')).toHaveProperty('completed', false);
        expect(visibleTodos[1].props('todo')).toHaveProperty('completed', true);
        expect(visibleTodos[2].props('todo')).toHaveProperty('completed', false);
        expect(visibleTodos[3].props('todo')).toHaveProperty('completed', true);
    });

    it('should only show active todos when filter is on active', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Active 1');
        await todoInput.vm.$emit('add-todo', 'Completed 1');
        await todoInput.vm.$emit('add-todo', 'Active 2');
        await todoInput.vm.$emit('add-todo', 'Completed 2');

        let todos = wrapper.findAllComponents(TodoItem);            
        await todos[1].vm.$emit('toggle', 2);
        await todos[3].vm.$emit('toggle', 4);

        // Act 
        const filterActiveButton = wrapper.getByDataTest('filter-active');
        await filterActiveButton.trigger('click');
        
        // Assert
        expect(filterActiveButton.classes()).toContain('active');

        const visibleTodos = wrapper.findAllComponents(TodoItem);
        expect(visibleTodos).toHaveLength(2);
        expect(visibleTodos[0].props('todo')).toHaveProperty('completed', false);
        expect(visibleTodos[1].props('todo')).toHaveProperty('completed', false);
    });

    it('should only show completed todos when filter is on completed', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Active 1');
        await todoInput.vm.$emit('add-todo', 'Completed 1');
        await todoInput.vm.$emit('add-todo', 'Active 2');
        await todoInput.vm.$emit('add-todo', 'Completed 2');

        let todos = wrapper.findAllComponents(TodoItem);            
        await todos[1].vm.$emit('toggle', 2);
        await todos[3].vm.$emit('toggle', 4);

        // Act 
        const filterActiveButton = wrapper.getByDataTest('filter-completed');
        await filterActiveButton.trigger('click');
        
        // Assert
        expect(filterActiveButton.classes()).toContain('active');

        const visibleTodos = wrapper.findAllComponents(TodoItem);
        expect(visibleTodos).toHaveLength(2);
        expect(visibleTodos[0].props('todo')).toHaveProperty('completed', true);
        expect(visibleTodos[1].props('todo')).toHaveProperty('completed', true);
    });

    it('should clear all completed todos when clear completed button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Active 1');
        await todoInput.vm.$emit('add-todo', 'Completed 1');
        await todoInput.vm.$emit('add-todo', 'Active 2');
        await todoInput.vm.$emit('add-todo', 'Completed 2');

        let todos = wrapper.findAllComponents(TodoItem);            
        await todos[1].vm.$emit('toggle', 2);
        await todos[3].vm.$emit('toggle', 4);

        // Act 
        const clearCompletedButton = wrapper.getByDataTest('clear-completed');
        await clearCompletedButton.trigger('click');
        
        // Assert
        const visibleTodos = wrapper.findAllComponents(TodoItem);
        expect(visibleTodos).toHaveLength(2);
        expect(visibleTodos[0].props('todo')).toHaveProperty('completed', false);
        expect(visibleTodos[1].props('todo')).toHaveProperty('completed', false);    
    });

    it('should show the correct amount of tasks on the buttons', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Active 1');
        await todoInput.vm.$emit('add-todo', 'Completed 1');
        await todoInput.vm.$emit('add-todo', 'Active 2');
        await todoInput.vm.$emit('add-todo', 'Completed 2');

        let todos = wrapper.findAllComponents(TodoItem);            
        await todos[1].vm.$emit('toggle', 2);
        await todos[3].vm.$emit('toggle', 4);

        // Act 
        const filterAllButton = wrapper.getByDataTest('filter-all');
        const filterActiveButton = wrapper.getByDataTest('filter-active');
        const filterCompletedButton = wrapper.getByDataTest('filter-completed');

        // Assert
        expect(filterAllButton.text()).toContain('(4)');
        expect(filterActiveButton.text()).toContain('(2)');
        expect(filterCompletedButton.text()).toContain('(2)');
    });

    it('should show a no todos message when state is empty', () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const emptyState = wrapper.getByDataTest('empty-state');
        let todos = wrapper.findAllComponents(TodoItem);

        // Assert
        expect(todos).toStrictEqual([]);
        expect(emptyState.text()).toContain('Geen todos nog. Voeg er een toe om te beginnen!')
    });

    it('should show the correct amount of tasks on the buttons', async () => {
        // Arrange
        const wrapper = shallowMount(TodoList);
        const todoInput = wrapper.findComponent(TodoInput);

        await todoInput.vm.$emit('add-todo', 'Active 1');        
        await todoInput.vm.$emit('add-todo', 'Active 2');
        
        let todos = wrapper.findAllComponents(TodoItem);        

        // Act         
        const filterCompletedButton = wrapper.getByDataTest('filter-completed');        
        await filterCompletedButton.trigger('click');
        const noResults = wrapper.getByDataTest('no-results');

        // Assert        
        expect(filterCompletedButton.text()).toContain('(0)');
        expect(filterCompletedButton.classes()).toContain('active');
        expect(noResults.text()).toContain('Geen todos in dit filter');


    });


});
