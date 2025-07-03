import data from '../assets/data/demoData.json'
import type { Story } from './app.interface'
export const mockStories: Story[] = [...JSON.parse(JSON.stringify(data))]