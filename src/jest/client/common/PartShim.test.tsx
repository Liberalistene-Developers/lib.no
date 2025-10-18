/**
 * Tests for PartShim utility
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import type {FC} from 'react';
import type {ComponentProps} from '@enonic/react-components';
import {createPartShim} from '/react4xp/common/PartShim/PartShim';

// Mock ComponentRegistry for testing
const createMockComponentRegistry = () => ({
  addContentType: () => {},
  addMacro: () => {},
  addLayout: () => {},
  addPage: () => {},
  addPart: () => {},
  getContentType: () => undefined,
  getMacro: () => undefined,
  getLayout: () => undefined,
  getPage: () => undefined,
  getPart: () => undefined,
  hasContentType: () => false,
  hasMacro: () => false,
  hasLayout: () => false,
  hasPage: () => false,
  hasPart: () => false
});

// Helper to create valid ComponentProps for testing
const createTestProps = (data: Record<string, unknown> = {}): ComponentProps => ({
  data,
  meta: {
    type: 'part',
    id: 'test-id',
    path: '/test/path',
    mode: 'live',
    componentRegistry: createMockComponentRegistry()
  },
  component: {
    type: 'part',
    descriptor: 'test:part',
    path: '/test/path'
  }
});

// Test component that accepts specific props
interface TestComponentProps {
  title?: string;
  count?: number;
  onAction?: () => void;
}

const TestComponent: FC<TestComponentProps> = ({title, count, onAction}) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {count !== undefined && <span data-testid="count">{count}</span>}
      {onAction && <button onClick={onAction}>Action</button>}
    </div>
  );
};

// Another test component for display name testing
const AnotherComponent: FC<{text?: string}> = ({text}) => <div>{text ?? 'default'}</div>;

// Anonymous component for display name fallback testing
const AnonymousComponent: FC<{value?: string}> = ({value}) => <div>{value ?? 'default'}</div>;
Object.defineProperty(AnonymousComponent, 'name', {value: ''});

describe('createPartShim', () => {
  describe('component wrapping', () => {
    it('should create a wrapper component that renders the original component', () => {
      const WrappedComponent = createPartShim(TestComponent);
      const componentProps = createTestProps({title: 'Test Title'});

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should pass all props from data to the wrapped component', () => {
      const WrappedComponent = createPartShim(TestComponent);
      const componentProps = createTestProps({
        title: 'Full Props Test',
        count: 42
      });

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByText('Full Props Test')).toBeInTheDocument();
      expect(screen.getByTestId('count')).toHaveTextContent('42');
    });

    it('should handle function props correctly', () => {
      const mockAction = jest.fn();
      const WrappedComponent = createPartShim(TestComponent);
      const componentProps = createTestProps({
        title: 'Function Props Test',
        onAction: mockAction
      });

      render(<WrappedComponent {...componentProps} />);

      const button = screen.getByRole('button', {name: 'Action'});
      button.click();

      expect(mockAction).toHaveBeenCalledTimes(1);
    });

    it('should handle empty data object', () => {
      const SimpleComponent: FC = () => <div>No props needed</div>;
      const WrappedComponent = createPartShim(SimpleComponent);
      const componentProps = createTestProps();

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByText('No props needed')).toBeInTheDocument();
    });
  });

  describe('display name', () => {
    it('should set displayName using the component name', () => {
      const WrappedComponent = createPartShim(TestComponent);

      expect(WrappedComponent.displayName).toBe('PartShim(TestComponent)');
    });

    it('should set displayName for different components', () => {
      const WrappedComponent = createPartShim(AnotherComponent);

      expect(WrappedComponent.displayName).toBe('PartShim(AnotherComponent)');
    });

    it('should use fallback displayName when component has no name', () => {
      const WrappedComponent = createPartShim(AnonymousComponent);

      expect(WrappedComponent.displayName).toBe('PartShim(Component)');
    });
  });

  describe('type safety', () => {
    it('should maintain type safety for component props', () => {
      // This test verifies TypeScript compilation and type inference
      const WrappedComponent = createPartShim(TestComponent);
      const componentProps = createTestProps({
        title: 'Type Safety Test',
        count: 100
      });

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByText('Type Safety Test')).toBeInTheDocument();
      expect(screen.getByTestId('count')).toHaveTextContent('100');
    });

    it('should handle complex prop types', () => {
      interface ComplexProps {
        items?: Array<{id: number; name: string}>;
        metadata?: {created: string};
      }

      const ComplexComponent: FC<ComplexProps> = ({items, metadata}) => (
        <div>
          <span data-testid="item-count">{items?.length ?? 0}</span>
          <span data-testid="created">{metadata?.created ?? ''}</span>
        </div>
      );

      const WrappedComponent = createPartShim(ComplexComponent);
      const componentProps = createTestProps({
        items: [
          {id: 1, name: 'Item 1'},
          {id: 2, name: 'Item 2'}
        ],
        metadata: {created: '2025-10-18'}
      });

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByTestId('item-count')).toHaveTextContent('2');
      expect(screen.getByTestId('created')).toHaveTextContent('2025-10-18');
    });
  });

  describe('React4xp v6 architecture pattern', () => {
    it('should follow the standard Part shim pattern', () => {
      // This test verifies the pattern used across all Parts in the codebase
      const WrappedComponent = createPartShim(TestComponent);

      // Verify it's a valid React component
      expect(typeof WrappedComponent).toBe('function');

      // Verify it has the correct displayName
      expect(WrappedComponent.displayName).toMatch(/^PartShim\(/);

      // Verify it can be rendered
      const componentProps = createTestProps({title: 'Architecture Test'});
      const {container} = render(<WrappedComponent {...componentProps} />);

      expect(container.firstChild).toBeTruthy();
    });

    it('should extract data from ComponentProps correctly', () => {
      const WrappedComponent = createPartShim(TestComponent);

      // This simulates how React4xp passes data to Parts
      const componentProps = createTestProps({
        title: 'Data Extraction Test',
        count: 999
      });

      render(<WrappedComponent {...componentProps} />);

      // Verify the data was extracted and passed to the component
      expect(screen.getByRole('heading')).toHaveTextContent('Data Extraction Test');
      expect(screen.getByTestId('count')).toHaveTextContent('999');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined optional props', () => {
      const WrappedComponent = createPartShim(TestComponent);
      const componentProps = createTestProps({
        title: 'Optional Props Test'
        // count and onAction are undefined
      });

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByText('Optional Props Test')).toBeInTheDocument();
      expect(screen.queryByTestId('count')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should handle null values in data', () => {
      interface NullableProps {
        title?: string;
        subtitle?: string | null;
      }

      const NullableComponent: FC<NullableProps> = ({title, subtitle}) => (
        <div>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
        </div>
      );

      const WrappedComponent = createPartShim(NullableComponent);
      const componentProps = createTestProps({
        title: 'Null Test',
        subtitle: null
      });

      render(<WrappedComponent {...componentProps} />);

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Null Test');
      expect(screen.queryByRole('heading', {level: 2})).not.toBeInTheDocument();
    });

    it('should handle boolean props', () => {
      interface BooleanProps {
        text?: string;
        isActive?: boolean;
        isDisabled?: boolean;
      }

      const BooleanComponent: FC<BooleanProps> = ({text, isActive, isDisabled}) => (
        <div data-testid="container" data-active={isActive} data-disabled={isDisabled}>
          {text ?? ''}
        </div>
      );

      const WrappedComponent = createPartShim(BooleanComponent);
      const componentProps = createTestProps({
        text: 'Boolean Test',
        isActive: true,
        isDisabled: false
      });

      render(<WrappedComponent {...componentProps} />);

      const container = screen.getByTestId('container');
      expect(container).toHaveAttribute('data-active', 'true');
      expect(container).toHaveAttribute('data-disabled', 'false');
    });
  });
});
