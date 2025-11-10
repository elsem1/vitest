import WeatherWidget from "../src/components/WeatherWidget.vue";
import { fetchWeather } from "../src/helpers/fetchWeather";
import { shallowMount } from "@vue/test-utils";

vi.mock('../src/fetchWeather', () => ({
    fetchWeather: vi.fn(),
}));

describe('WeatherWidget', () => {
    it('should display the weather in {city}', async () =>{
        // Arrange
        vi.mocked(fetchWeather).mockResolvedValue({            
            temperature: 14,
            description: 'Cloudy',
        });

        // Act
        const weather =  await fetchWeather();
    })
})
