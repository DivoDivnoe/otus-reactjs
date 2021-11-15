import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { Game } from './Game';
import { StartGameType } from '@/modules/game/useGameLogicRedux';
import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType } from '@/modules/game/fill';
import { Model } from '@/modules/game/model';

describe('Game component', () => {
  it('renders correctly', async () => {
    const model: Model = Array.from({ length: 30 }, () =>
      Array.from({ length: 50 }, () => 0)
    );
    model[1][1] = 1;
    model[10][10] = 1;

    const mocks: StartGameType = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.LOW,
      sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.FAST, SpeedType.SLOW, SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH, FillType.LOW],
      model,
      isPlaying: false,
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
      changeSize: jest.fn(),
      changeSpeed: jest.fn(),
      changeFill: jest.fn(),
      clickHandler: jest.fn(),
    };

    const { asFragment } = render(<Game {...mocks} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles click event correctly', () => {
    const model: Model = Array.from({ length: 30 }, () =>
      Array.from({ length: 50 }, () => 0)
    );
    model[1][1] = 1;
    model[10][10] = 1;

    const mocks: StartGameType = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.LOW,
      sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.FAST, SpeedType.SLOW, SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH, FillType.LOW],
      model,
      isPlaying: false,
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
      changeSize: jest.fn(),
      changeSpeed: jest.fn(),
      changeFill: jest.fn(),
      clickHandler: jest.fn(),
    };

    render(<Game {...mocks} />);

    fireEvent.click(screen.getAllByTestId('cell')[57]);
    expect(mocks.clickHandler).toHaveBeenCalledWith({ x: 7, y: 1 });
  });

  it('handles click event correctly while changing board size', () => {
    const model: Model = Array.from({ length: 30 }, () =>
      Array.from({ length: 50 }, () => 0)
    );
    model[1][1] = 1;
    model[10][10] = 1;

    const mocks: StartGameType = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.LOW,
      sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.FAST, SpeedType.SLOW, SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH, FillType.LOW],
      model,
      isPlaying: false,
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
      changeSize: jest.fn(),
      changeSpeed: jest.fn(),
      changeFill: jest.fn(),
      clickHandler: jest.fn(),
    };

    render(<Game {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: 'Size: 100x80' }));
    expect(mocks.changeSize).toHaveBeenCalledWith(BoardSize.LARGE);

    fireEvent.click(screen.getByRole('button', { name: 'Size: 70x50' }));
    expect(mocks.changeSize).toHaveBeenCalledWith(BoardSize.MEDIUM);
  });

  it('handles click event correctly while changing speed', () => {
    const model: Model = Array.from({ length: 30 }, () =>
      Array.from({ length: 50 }, () => 0)
    );
    model[1][1] = 1;
    model[10][10] = 1;

    const mocks: StartGameType = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.LOW,
      sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.FAST, SpeedType.SLOW, SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH, FillType.LOW],
      model,
      isPlaying: false,
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
      changeSize: jest.fn(),
      changeSpeed: jest.fn(),
      changeFill: jest.fn(),
      clickHandler: jest.fn(),
    };

    render(<Game {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: 'fast' }));
    expect(mocks.changeSpeed).toHaveBeenCalledWith('fast');

    fireEvent.click(screen.getByRole('button', { name: 'medium' }));
    expect(mocks.changeSpeed).toHaveBeenCalledWith('medium');
  });

  it('handles click event correctly while changing fill', () => {
    const model: Model = Array.from({ length: 30 }, () =>
      Array.from({ length: 50 }, () => 0)
    );
    model[1][1] = 1;
    model[10][10] = 1;

    const mocks: StartGameType = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.LOW,
      sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.FAST, SpeedType.SLOW, SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH, FillType.LOW],
      model,
      isPlaying: false,
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
      changeSize: jest.fn(),
      changeSpeed: jest.fn(),
      changeFill: jest.fn(),
      clickHandler: jest.fn(),
    };

    render(<Game {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: '10%' }));
    expect(mocks.changeFill).toHaveBeenCalledWith('low');

    fireEvent.click(screen.getByRole('button', { name: '30%' }));
    expect(mocks.changeFill).toHaveBeenCalledWith('high');
  });

  it('handles controls click event correctly', () => {
    const model: Model = Array.from({ length: 30 }, () =>
      Array.from({ length: 50 }, () => 0)
    );
    model[1][1] = 1;
    model[10][10] = 1;

    const mocks: StartGameType = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.LOW,
      sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
      speedTypes: [SpeedType.FAST, SpeedType.SLOW, SpeedType.MEDIUM],
      fillTypes: [FillType.MEDIUM, FillType.HIGH, FillType.LOW],
      model,
      isPlaying: false,
      play: jest.fn(),
      pause: jest.fn(),
      clear: jest.fn(),
      changeSize: jest.fn(),
      changeSpeed: jest.fn(),
      changeFill: jest.fn(),
      clickHandler: jest.fn(),
    };

    render(<Game {...mocks} />);

    fireEvent.click(screen.getByRole('button', { name: 'play' }));
    expect(mocks.play).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'pause' }));
    expect(mocks.pause).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'clear' }));
    expect(mocks.clear).toHaveBeenCalledTimes(1);
  });
});
