import WeatherWidget from "../src/components/WeatherWidget.vue";
import { fetchWeather } from "../src/helpers/fetchWeather";
import { flushPromises, shallowMount } from "@vue/test-utils";

vi.mock('../src/helpers/fetchWeather', () => ({
    fetchWeather: vi.fn(),
}));

describe('WeatherWidget', () => {
    beforeEach(() => {        
        vi.clearAllMocks();
    });

    it('should display the weather of the city', async () =>{
        // Arrange
        vi.mocked(fetchWeather).mockResolvedValue({            
            temperature: 14,
            description: 'Cloudy',
        });

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city: 'Amsterdam' }
        });

        await flushPromises();

        // Assert
        expect(wrapper.find('h3').text()).toBe('Weather in Amsterdam');
        expect(wrapper.find('.error').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(false);
        expect(wrapper.find('.temperature').text()).toBe('14°C');
        expect(wrapper.find('.description').text()).toBe('Cloudy');
        expect(fetchWeather).toHaveBeenCalledWith('Amsterdam');
    });

    it('should throw an error when failed to fetch weather', async () => {
        // Arrange
        vi.mocked(fetchWeather).mockRejectedValue(
            new Error('City unknown')
        );        
        
        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city: 'Schubbekutteveen' }
        });
        
        await flushPromises();

        // Arrange
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('Error: City unknown');
        expect(wrapper.find('.weather-data').exists()).toBe(false);
        expect(fetchWeather).toHaveBeenCalledWith('Schubbekutteveen');
        expect(fetchWeather).toBeCalledTimes(1);
    });

    it('should show a loading message when loading', async () => {
        // Arrange
        vi.mocked(fetchWeather).mockResolvedValue({            
            temperature: 14,
            description: 'Cloudy',
        });

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city: 'Groningen' }
        });

        // Assert
        expect(wrapper.find('.loading').exists()).toBe(true);
        expect(wrapper.find('.loading').text()).toBe('Loading weather...');
        expect(wrapper.find('.error').exists()).toBe(false);
        expect(wrapper.find('.weather-data').exists()).toBe(false);
        expect(fetchWeather).toBeCalledTimes(1);
    });

    it('should throw an error when failed to fetch weather', async () => {
        // Arrange
        vi.mocked(fetchWeather).mockRejectedValue(
            'Network problems'
        );        
        
        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city: 'Amsterdam' }
        });
        
        await flushPromises();

        // Arrange
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('Error: Failed to fetch weather');
        expect(wrapper.find('.weather-data').exists()).toBe(false);
        expect(fetchWeather).toBeCalledTimes(1);
    });

    it('should show a message when there is no data available', async () => {
        // Arrange
        vi.mocked(fetchWeather).mockResolvedValue(
            null as any
        );        
        
        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city: 'Verweggiestan' }
        });
        
        await flushPromises();

        // Arrange
        expect(wrapper.find('.error').exists()).toBe(false);
        expect(wrapper.find('.empty').text()).toBe('No weather data available');
        expect(wrapper.find('.weather-data').exists()).toBe(false);
        expect(fetchWeather).toBeCalledTimes(1);
    });    
});
