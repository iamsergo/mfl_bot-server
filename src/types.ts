export type DBUser = {
  id: string;
  name: string;
  username: string;
  tgId: string;
};

export enum GameResult {
  HOME = 0,
  DRAW = 1,
  AWAY = 2,
  TECHNICAL = 3,
}

export type DBGame = {
  id: string;
  teams: string[];
  teams_logos: string[];
  time: string;
  score: number[] | null;
  result: GameResult | null;
  total: number | null;
  diff: number | null;
  group: string;
  tour: string;
};

export type DBPrediction = {
  id: string;
  user_id: number;
  game_id: number;
  value: number[] | null;
  total: number | null;
  result: GameResult;
  diff: number | null;
  time: string;
};

export type DBRating = {
  username: string;
  position: number;
  points: number;
};

export enum DBPredictionPoints {
  NOTHING = 0,
  ONLY_RESULT = 2,
  RESULT_AND_DIFF = 3,
  EXACTLY_SCORE = 5,
  TECHNICAL_RESULT = 1,
}

export type DBPreictionsStats = {
  value: number | null;
  count: number;
};

export type DBLastResults = { points: number }[];

export type DBPredictionResult = {
  teams_logos: string[];
  time: string;
  teams: string[];
  prediction: number[];
  points: DBPredictionPoints | null;
  result: number[] | null;
};

export type DBTableRow = {
  group: string;
  position: number;
  team_id: number;
  team: string;
  team_logo: string;
  games: number;
  win: number;
  draw: number;
  lose: number;
  score: number;
  pass: number;
  diff: number;
  points: number;
};

export type DBRawGame = {
  id: string;
  home_id: number;
  away_id: number;
  time: string;
  score: number[] | null;
  result: GameResult | null;
  total: number | null;
  diff: number | null;
  group: string;
  tour: string;
};
