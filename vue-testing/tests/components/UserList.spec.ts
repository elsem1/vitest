import { shallowMount } from "@vue/test-utils";
import UserList from "../../src/components/UserList.vue";

describe('UserList', () => {
    // Mock data
    const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    it('should delete a user when the delete button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(UserList, { 
                props: { users: mockUsers } 
            });

            // Act
            const firstDeleteButton = wrapper.findAll('[data-test="delete-button"]')[0];
            await firstDeleteButton.trigger('click');

            // Assert
            expect(wrapper.emitted('delete')).toBeDefined();
            expect(wrapper.emitted('delete')?.[0]).toEqual([1]);
        });
        
    it('should render all users correctly', () => {
        // Arrange
        const wrapper = shallowMount(UserList, { 
                props: { users: mockUsers } 
            });

        // Act 
        const users = wrapper.findAll('[data-test="user-item"]');
        
        // Assert 
        expect(users).toHaveLength(mockUsers.length);
        expect(users).toHaveLength(2);

        expect(users[0].find('[data-test="user-name"]').text()).toBe('John Doe');
        expect(users[0].find('[data-test="user-email"]').text()).toBe('john@example.com');
        expect(users[1].find('[data-test="user-name"]').text()).toBe('Jane Doe');
        expect(users[1].find('[data-test="user-email"]').text()).toBe('jane@example.com');
    });

    it('should show "No users found" when state is empty', () =>{
        // Arrange
        const wrapper = shallowMount(UserList, { 
            props: { users: [] }
        });

        // Act & Assert
        expect(wrapper.getByDataTest('user-list').exists()).toBe(false);
        expect(wrapper.getByDataTest('empty-state').exists()).toBe(true);
        expect(wrapper.getByDataTest('empty-state').text()).toBe('No users found');
    });

    it('should not show "No users found" when state is empty', () =>{
        // Arrange
        const wrapper = shallowMount(UserList, { 
            props: { users: mockUsers }
        });

        // Act & Assert        
        expect(wrapper.getByDataTest('user-list').exists()).toBe(true);
        expect(wrapper.getByDataTest('empty-state').exists()).toBe(false);
    });

    it('should render a delete button after every user', () => {
        // Arrange
        const wrapper = shallowMount(UserList, { 
                props: { users: mockUsers } 
            });

        // Act
        const buttons = wrapper.findAll('[data-test="delete-button"]');

        // Assert
        expect((buttons[0]).exists()).toBe(true);
        expect((buttons[1]).exists()).toBe(true);
        expect(buttons).toHaveLength(mockUsers.length);
    });
});