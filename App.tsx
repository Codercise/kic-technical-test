import MyComponent from './components/MyComponent/MyComponent';

export default function App() {
  const data = [
    {
      id: 1,
      name: "Nick"
    }
  ]
  return (
    <MyComponent data={data} />
  );
}