import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {ColorCell} from '../../components/common/TableCommons.jsx';

it('renders welcome message', () => {
  render(<ColorCell value="Learn React" />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});