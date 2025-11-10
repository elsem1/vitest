import SearchForm from "../../src/components/SearchForm.vue";
import { shallowMount } from "@vue/test-utils";

describe('SearchForm', () => {    
    it('should call onSubmit when form is submitted', async () =>{
        const mockOnSubmit = vi.fn();
        // Arrange
        const wrapper = shallowMount(SearchForm, {
            props: { onSubmit: mockOnSubmit }
        });

        // Act  
        await wrapper.find('input').setValue('test query')
        await wrapper.find('form').trigger('submit');

        // Assert
        expect(mockOnSubmit).toHaveBeenCalledWith('test query');
        expect(wrapper.emitted('search')).toBeDefined();
        expect(wrapper.emitted('search')?.[0]).toEqual(['test query']);
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('should emit search event with query', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: { onSubmit: mockOnSubmit }
        });

        // Act
        await wrapper.find('input').setValue('test query');
        await wrapper.find('form').trigger('submit');        
        

        // Assert
        expect(wrapper.emitted('search')?.[0]).toEqual(['test query']);
    });

    it('should not call onSubmit when query is whitepace', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: { onSubmit: mockOnSubmit }
        });

        // Act
        const searchInput = wrapper.getByDataTest('search-input');
        const form = wrapper.find('form');

        await searchInput.setValue('           ');
        await form.trigger('submit');

        // Assert
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when query is empty', async () => {
        // Arrange
        const mockOnSubmit = vi.fn();
        const wrapper = shallowMount(SearchForm, {
            props: { onSubmit: mockOnSubmit }
        });

        // Act
        await wrapper.find('form').trigger('submit');

        // Assert
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });
});