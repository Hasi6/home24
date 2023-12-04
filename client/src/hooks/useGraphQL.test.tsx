import { act, renderHook } from '@testing-library/react';
import useGraphQL from '@/hooks/useGraphQL';

describe('useGraphQL Hook', () => {
  it('checking default state', () => {
    const { result } = renderHook(() => useGraphQL('', {}));

    expect(result.current.loading).toBe(true);
    expect(result.current.initialLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.isRefreshing).toBe(false);
  });

  it('checking refresh state', async () => {
    const { result } = renderHook(() => useGraphQL('', {}));
    await act(() => {
      result.current.refresh();
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.isRefreshing).toBe(true);
  });
});
