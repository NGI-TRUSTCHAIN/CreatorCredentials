import { screen } from '@testing-library/react';
import { render } from '@/shared/utils/testUtils';
import { BlankLayout } from './BlankLayout';

describe('BlankLayout', () => {
  it('should render children', () => {
    render(<BlankLayout>TEST</BlankLayout>);

    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  it('should render BrandImage', () => {
    render(<BlankLayout>TEST</BlankLayout>);

    expect(
      screen.getByAltText('Creator Credentials brand logo'),
    ).toHaveAttribute('src', '/images/brand.svg');
  });
});
