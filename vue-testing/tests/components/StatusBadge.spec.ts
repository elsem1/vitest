import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import StatusBadge from '../../src/components/StatusBadge.vue';

describe('StatusBadge', () => {
    it('should show success badge when status is success', () => {
        // Arrange
        const status = 'success';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-success').exists()).toBe(true);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
        expect(wrapper.find('.badge-error').exists()).toBe(false);
    });

    it('should show error badge when status is error', () => {
        // Arrange
        const status = 'error';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-error').exists()).toBe(true);
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
    });
    it('should show warning badge when status is error', () => {
        // Arrange
        const status = 'warning';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(true);
    });
    it('should show no badges when status is empty', () => {
        // Arrange
        const status = '';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
    });
    it('should show no badges when status is not error, succes or warning', () => {
        // Arrange
        const status = '102';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
    });
    it('should show warning badge with an orange color', () => {
        // Arrange
        const status = 'warning';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert        
        expect(wrapper.find('.badge-warning').exists()).toBe(true);
        expect(wrapper.find('.badge-warning.color')).toBe('#856404')
    });
});