import RegistrationForm from "../../src/components/RegistrationForm.vue";
import {shallowMount} from '@vue/test-utils';

describe('RegistrationForm', () => {
    it('should emit submit event with all the correct data', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const passwordConfirmInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');
    
        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await passwordConfirmInput.setValue('password123');
        await acceptTermsInput.setValue(true);
        await form.trigger('submit');
    
        // Assert
        expect(wrapper.emitted('submit')).toBeDefined();
        expect(wrapper.emitted('submit')?.[0]).toStrictEqual([{
            email: 'user@example.com', 
            password: 'password123', 
            confirmPassword: 'password123', 
            acceptTerms: true
        }]);
    });

    it('should have empty fields when rendered', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const passwordConfirmInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        
        // Assert
        expect((emailInput.element as HTMLInputElement).value).toBe('');
        expect((passwordInput.element as HTMLInputElement).value).toBe('');
        expect((passwordConfirmInput.element as HTMLInputElement).value).toBe('');
        expect((acceptTermsInput.element as HTMLInputElement).checked).toBe(false);
    });

    it('should not have error messages on mount', () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const form = wrapper.find('form');

        // Assert
        expect(wrapper.find('.error').exists()).toBe(false);
    });

    it('should show an error when the password and confirmPassword do not match', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const passwordConfirmInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await passwordConfirmInput.setValue('Password123');
        await acceptTermsInput.setValue(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('Wachtwoorden komen niet overeen');
    });

    it('should show an error when the accept terms checkbox is not checked', async () =>{
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const passwordConfirmInput = wrapper.find('#confirmPassword');        
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('password123');
        await passwordConfirmInput.setValue('password123');        
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('Je moet de voorwaarden accepteren');
    });


    it('should not submit when an error occurs', async () => {
        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const passwordConfirmInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('');
        await passwordInput.setValue('password123');
        await passwordConfirmInput.setValue('password123');
        await acceptTermsInput.setValue(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('submit')).toBeUndefined();        
    });

    it('should only accept passwords that are at least 8 characters', async () => {
       // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const passwordConfirmInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');
        const form = wrapper.find('form');

        // Act
        await emailInput.setValue('user@example.com');
        await passwordInput.setValue('pass');
        await passwordConfirmInput.setValue('pass');
        await acceptTermsInput.setValue(true);
        await form.trigger('submit');

        // Assert
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('Wachtwoord moet minimaal 8 karakters zijn');    
    });   
    
});
