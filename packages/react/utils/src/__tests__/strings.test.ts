import { describe, it, expect } from '@jest/globals';
import { prefixClassName, prefixClassNames } from '../strings';

describe('strings utils ->  prefixClassName', () => {
  it('should return "prefix-className" if className does not start with prefix', () => {
    expect(prefixClassName('className', 'prefix')).toBe('prefix-className');
  });

  it('should return "className" if no prefix is provided', () => {
    expect(prefixClassName('className', '')).toBe('className');
    expect(prefixClassName('className', null)).toBe('className');
    expect(prefixClassName('className', undefined)).toBe('className');
    expect(prefixClassName('className', '', null)).toBe('className');
    expect(prefixClassName('className', '', undefined)).toBe('className');
    expect(prefixClassName('className', 'foo', '')).toBe('fooclassName');
  });

  it('should return "className" if className starts with prefix', () => {
    expect(prefixClassName('prefix-className', 'prefix')).toBe('prefix-className');
  });
});

describe('strings utils ->  prefixClassNames', () => {
  it('should return "prefix-className" if className does not start with prefix', () => {
    expect(prefixClassNames('className banana', 'prefix')).toBe('prefix-className prefix-banana');
  });

  it('should return "className" if no prefix is provided', () => {
    expect(prefixClassNames('className foo', '')).toBe('className foo');
  });

  it('should return "className" if className starts with prefix', () => {
    expect(prefixClassNames('prefix-className  banana', 'prefix')).toBe('prefix-className prefix-banana');
    expect(prefixClassNames('first   prefix-second third  ', 'prefix')).toBe('prefix-first prefix-second prefix-third');
    expect(prefixClassNames('   prefix-first   second prefix-third fourth  ', 'prefix')).toBe(
      'prefix-first prefix-second prefix-third prefix-fourth'
    );
  });
});
