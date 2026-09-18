// src/__tests__/SectionManager.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CmsProvider } from '../context/CmsContext';
import { SectionManager } from '../components/admin/SectionManager';

const renderWithCms = (ui: React.ReactElement) => {
  const initState = {
    content: {},
    visibleSections: { hero: true, pricing: true },
    sectionOrder: ['hero', 'pricing'],
    pricing: [],
    editMode: true,
    themeOverrides: undefined,
  };
  localStorage.setItem('cmsState', JSON.stringify(initState));
  return render(<CmsProvider>{ui}</CmsProvider>);
};

test('SectionManager displays sections', () => {
  renderWithCms(<SectionManager />);
  expect(screen.getByText('hero')).toBeInTheDocument();
  expect(screen.getByText('pricing')).toBeInTheDocument();
});

test('SectionManager toggles visibility', () => {
  renderWithCms(<SectionManager />);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes[0]).toBeChecked();
  
  fireEvent.click(checkboxes[0]);
  
  // Since we clicked it, it should update context and save to localStorage
  const stored = JSON.parse(localStorage.getItem('cmsState') || '{}');
  expect(stored.visibleSections?.hero).toBe(false);
});
