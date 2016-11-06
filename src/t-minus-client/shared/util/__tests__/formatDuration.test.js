import formatDuration from '../formatDuration';

describe('formatDuration', () => {
  it('formats a duration of time', () => {
    const result = formatDuration(95440500);
    expect(result.d).toBe(1);
    expect(result.h).toBe(2);
    expect(result.m).toBe(30);
    expect(result.s).toBe(40);
    expect(result.ms).toBe(500);
  });

  it('returns an zeroed result when no duration value exists', () => {
    const result = formatDuration(null);
    expect(result.d).toBe(0);
    expect(result.h).toBe(0);
    expect(result.m).toBe(0);
    expect(result.s).toBe(0);
    expect(result.ms).toBe(0);
  });
});
