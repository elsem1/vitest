import LoginStatus from '../../src/components/LoginStatus.vue';
import { shallowMount } from '@vue/test-utils';

describe('LoginStatus', () => {
    it('should show welcome message when status is loggedIn', () => {
        // Arrange
        const status = 'loggedIn';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });
        
        // Assert
        expect(wrapper.find('.welcome').text()).toBe('✓ Welkom! Je bent ingelogd');
        expect(wrapper.find('.welcome').exists()).toBe(true);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(false);
    });
    it('should show logged-out in message when status is loggedOut', () => {
        // Arrange
        const status = 'loggedOut';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });
        
        // Assert
        expect(wrapper.find('.logged-out').text()).toBe('⚠ Niet ingelogd');
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(true);
        expect(wrapper.find('.loading').exists()).toBe(false);
    });
    it('should show loading in message when status is loading', () => {
        // Arrange
        const status = 'loading';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });
        
        // Assert
        expect(wrapper.find('.loading').text()).toBe('⏳ Laden...');
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(true);
    });
    it('should show loading when status is anything else but loggedIn or loggedOut', () => {
        // Arrange
        const status = NaN;

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });
        
        // Assert        
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(true);
    });
    
    
});


