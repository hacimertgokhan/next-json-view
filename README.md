# Next Json Viewer
A canvas-based JSON visualizer component for Next.js and React applications.

## Installation
```bash
npm install next-json-view
```

## Usage
```javascript
import { JSONCanvasVisualizer } from 'next-json-view';

const MyComponent = () => {
  const data = {
    name: "John Doe",
    age: 30
  };

  return (
    <JSONCanvasVisualizer 
      data={data}
      width={800}
      height={600}
    />
  );
};
```