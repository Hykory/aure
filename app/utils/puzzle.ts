export const PUZZLE_SIZE = 16;

export function solvedTiles(): number[] {
  return Array.from({ length: PUZZLE_SIZE }, (_, index) => index);
}

export function shuffleTiles(): number[] {
  const tiles = solvedTiles();
  for (let index = tiles.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [tiles[index], tiles[swapWith]] = [tiles[swapWith], tiles[index]];
  }
  if (isPuzzleSolved(tiles)) {
    [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
  }
  return tiles;
}

export function isPuzzleSolved(tiles: number[]): boolean {
  return tiles.every((tile, index) => tile === index);
}

export function swapTiles(
  tiles: number[],
  first: number,
  second: number,
): number[] {
  const next = [...tiles];
  [next[first], next[second]] = [next[second], next[first]];
  return next;
}
