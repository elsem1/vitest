import LikeButton from '../../src/components/LikeButton.vue'
import { shallowMount } from '@vue/test-utils';

describe('LikeButton', () => {
    it('should show a like button', () => {
        // Arrange
        const liked = '';
        
        // Act
        const wrapper = shallowMount(LikeButton);

        // Assert
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.text()).toContain('🤍 Like');        
    });
    it('should not show like count when there are no likes', () => {
        // Arrange
        const count = 0;

        // Act
        const wrapper = shallowMount(LikeButton, { props: { count } });

        // Assert
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.count').exists()).toBe(false);
    });  
    it('should change the text of the like button from Like to Liked when clicked once', async () => {
        // Arrange          
        const wrapper = shallowMount(LikeButton);      
        expect(wrapper.text()).toContain('🤍 Like');

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.text()).toContain('❤️ Liked');
    });    
    it('should toggle from like to liked and back to like when clicked multiple times', async () => {
        // Arrange 
        const wrapper = shallowMount(LikeButton);

        // Act & Assert
        expect(wrapper.text()).toContain('🤍 Like');
        await wrapper.find('button').trigger('click');
        expect(wrapper.text()).toContain('❤️ Liked');
        
        await wrapper.find('button').trigger('click');
        expect(wrapper.text()).toContain('🤍 Like');

        await wrapper.find('button').trigger('click');
        expect(wrapper.text()).toContain('❤️ Liked');
    });
    it('should emit a like emit when the button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(LikeButton);

        // Act 
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.emitted('like')).toHaveLength(2);
        expect(wrapper.emitted('like')?.[0]).toStrictEqual([]);
        expect(wrapper.emitted()).toHaveProperty('like');
    });
    it('should increment the like counter by 1 after liking', async () => {
        // Arrange
        const count = 0;
        const wrapper = shallowMount(LikeButton, { props: { count } });

        // Act & Assert
        await wrapper.find('button').trigger('click');
        expect(wrapper.text()).toContain('(8)');
    }); // Deze werkt niet omdat er geen counter++ functionaliteit is
    
});