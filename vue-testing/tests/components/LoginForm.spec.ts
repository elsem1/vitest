import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import LoginForm from '../../src/components/LoginForm.vue';

describe('LoginForm', () => {
    it('should update email when user types in email field', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');

        // Act
        await emailInput.setValue('test@example.com');

        // Assert
        expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com');
    });

    it('should emit submit event with email and password when form is submitted', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('secret123');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([
            {email: 'user@example.com', password: 'secret123'},
        ]);
    });

    it('should show error when form is submitted with empty fields', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should have empty fields when rendered', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        
        // Assert
        expect((emailInput.element as HTMLInputElement).value).toBe('');
        expect((passwordInput.element as HTMLInputElement).value).toBe('');
    });

    it('should show error when password field is empty', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);
        const emailInput = wrapper.find('#email');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
        expect(wrapper.emitted('submit')).toBeFalsy();
    });

    it('should have no errors at the start of the handlesubmit event', async () => {
        // Arrange
        const wrapper = shallowMount(LoginForm);        
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const form = wrapper.find('form');

        // Act
        await form.trigger('submit');
        expect(wrapper.find('.error').text()).toBe('Vul alle velden in');

        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('secret123');
        await form.trigger('submit');

        // Assert 
        expect(wrapper.find('.error').text()).toBe('');
    })
});