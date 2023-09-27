import { MyComponent } from './components/MyComponent/MyComponent';
import { Item } from './components/MyComponent/MyComponent.types';

export default function App() {
  const dataSource: Array<Item> = [
    {
      id: 1,
      name: "Nick"
    },
    {
      id: 2,
      name: "Nick 2"
    }
  ]
  return (
    <MyComponent data={dataSource} />
  );
}