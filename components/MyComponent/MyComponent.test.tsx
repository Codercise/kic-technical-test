import React from 'react';
import { describe, expect, test, it } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  const data = [
    {
      id: 1,
      name: "Nick"
    }
  ]
  it('renders the component correctly', async () => {
    const { getByText } = render(<MyComponent data={[]} />);
    const clearButton = getByText('Clear');
    expect(clearButton).toBeTruthy();
  });

  it('renders the items list correctly', async () => {
    const { getByText } = render(<MyComponent data={data} />);
    const listText = getByText('Nick')
    const selectedText = getByText('Not selected')
    expect(listText).toBeTruthy()
    expect(selectedText).toBeTruthy()
  })

  it('clears input field', async () => {
    const { getByText, getByPlaceholderText } = render(<MyComponent data={data} />)
    const input = getByPlaceholderText('Search...')
    const clearButton = getByText('Clear')

    fireEvent.changeText(input, "Test Text")
    expect(input.props.value).toBe('Test Text')

    fireEvent.press(clearButton)
    expect(input.props.value).toBe("")
  })

  it('selects item when pressed', async () => {
    const { getByText } = render(<MyComponent data={data} />)
    const item = getByText("Nick")

    expect(item).toBeTruthy()

    fireEvent.press(item)

    const selectedText = getByText("Selected")
    expect(selectedText).toBeTruthy()
  })

  it('deselects item when pressed twice', async() => {
    const { getByText } = render(<MyComponent data={data} />)
    const item = getByText("Nick")

    fireEvent.press(item)
    fireEvent.press(item)

    const selectedText = getByText("Not selected")
    expect(selectedText).toBeTruthy()
  })
})