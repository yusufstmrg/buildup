// src/__tests__/EditableText.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CmsProvider } from '../context/CmsContext';
import { EditableText } from '../components/admin/EditableText';

// Helper to wrap component with CmsProvider and enable edit mode
const renderWithCms = (ui: React.ReactElement) => {
  // Set editMode flag in localStorage before render
  const initState = {
    content: {},
    visibleSections: {},
    sectionOrder: [],
    pricing: [],
    editMode: true,
    themeOverrides: undefined,
  };
  localStorage.setItem('cmsState', JSON.stringify(initState));
  return render(<CmsProvider>{ui}</CmsProvider>);
};

test('EditableText displays default content when not edited', () => {
  renderWithCms(<EditableText id="test" default="Hello" />);
  const span = screen.getByText('Hello');
  expect(span).toBeInTheDocument();
});

test('EditableText allows editing and persists to context/localStorage', () => {
  renderWithCms(<EditableText id="test" default="Hello" />);
  const textarea = screen.getByDisplayValue('Hello');
  fireEvent.change(textarea, { target: { value: 'World' } });
  fireEvent.blur(textarea);

  // After blur, should have saved content, and textarea remains (still edit mode)
  expect(textarea).toHaveValue('World');
  // Verify that localStorage was updated
  const stored = JSON.parse(localStorage.getItem('cmsState') || '{}');
  expect(stored.content?.test).toBe('World');
});
