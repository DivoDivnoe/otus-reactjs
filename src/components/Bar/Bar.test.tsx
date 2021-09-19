import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Bar from './Bar';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('Bar component', () => {
  it('renders correctly', () => {
    const mocks = {
      sizes: [BoardSize.SMALL, BoardSize.LARGE],
      speedTypes: [SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH],
      size: BoardSize.SMALL,
      speed: SpeedType.MEDIUM,
      fill: FillType.MEDIUM,
      changeSizeHandler: jest.fn(),
      changeSpeedHandler: jest.fn(),
      changeFillType: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
    };

    render(<Bar {...mocks} />);

    expect(
      screen.getByRole('button', { name: 'Size: 50x30' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Size: 100x80' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '20%' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '30%' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'medium' })).toBeInTheDocument();
  });

  it('handles click event correctly while changing board size', () => {
    const mocks = {
      sizes: [BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH],
      size: BoardSize.MEDIUM,
      speed: SpeedType.MEDIUM,
      fill: FillType.MEDIUM,
      changeSizeHandler: jest.fn(),
      changeSpeedHandler: jest.fn(),
      changeFillType: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
    };

    render(<Bar {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: 'Size: 100x80' }));
    expect(mocks.changeSizeHandler).toHaveBeenCalledWith('large');

    fireEvent.click(screen.getByRole('button', { name: 'Size: 70x50' }));
    expect(mocks.changeSizeHandler).toHaveBeenCalledWith('medium');
  });

  it('handles click event correctly while changing speed', () => {
    const mocks = {
      sizes: [BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.MEDIUM, SpeedType.FAST],
      fillTypes: [FillType.MEDIUM, FillType.HIGH],
      size: BoardSize.MEDIUM,
      speed: SpeedType.MEDIUM,
      fill: FillType.MEDIUM,
      changeSizeHandler: jest.fn(),
      changeSpeedHandler: jest.fn(),
      changeFillType: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
    };

    render(<Bar {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: 'fast' }));
    expect(mocks.changeSpeedHandler).toHaveBeenCalledWith('fast');

    fireEvent.click(screen.getByRole('button', { name: 'medium' }));
    expect(mocks.changeSpeedHandler).toHaveBeenCalledWith('medium');
  });

  it('handles click event correctly while changing fill', () => {
    const mocks = {
      sizes: [BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.MEDIUM, SpeedType.FAST],
      fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
      size: BoardSize.MEDIUM,
      speed: SpeedType.MEDIUM,
      fill: FillType.MEDIUM,
      changeSizeHandler: jest.fn(),
      changeSpeedHandler: jest.fn(),
      changeFillType: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
    };

    render(<Bar {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: '10%' }));
    expect(mocks.changeFillType).toHaveBeenCalledWith('low');

    fireEvent.click(screen.getByRole('button', { name: '30%' }));
    expect(mocks.changeFillType).toHaveBeenCalledWith('high');
  });

  it('handles controls click event correctly', () => {
    const mocks = {
      sizes: [BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.MEDIUM, SpeedType.FAST],
      fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
      size: BoardSize.MEDIUM,
      speed: SpeedType.MEDIUM,
      fill: FillType.MEDIUM,
      changeSizeHandler: jest.fn(),
      changeSpeedHandler: jest.fn(),
      changeFillType: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
    };

    render(<Bar {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: 'play' }));
    expect(mocks.play).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'pause' }));
    expect(mocks.pause).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'clear' }));
    expect(mocks.clear).toHaveBeenCalledTimes(1);
  });
});
