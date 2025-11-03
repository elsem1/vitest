import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '../../src/components/HelloWorld.vue';

describe('HelloWorld', () => {
    it('should mount without errors', () => {
        // Arrange: Definieer de props die de component verwacht
        const msg = 'Hello Vitest';

        // Act: Mount de component (shallowMount is voldoende voor deze test)
        const wrapper = shallowMount(HelloWorld, { props: { msg } });

        // Assert: Controleer of de wrapper bestaat
        expect(wrapper.exists()).toBe(true);
    });
    it('should render initial count as 0', () => {
        // Arrange         
        const msg = '';
        // Act
        const wrapper = shallowMount(HelloWorld, { props: {  msg } });

        // Assert 
        expect(wrapper.find('button').text()).toBe('count is 0');
    });
    it('should the count when button is clicked', async () => {
        // Arrange
        const msg = 'Hallo!'
        // Act
        const wrapper = shallowMount(HelloWorld, { props: { msg } });
        await wrapper.find('button').trigger('click');

        // Assert 
        expect(wrapper.find('button'). text()).toBe('count is 1');
    });
});
