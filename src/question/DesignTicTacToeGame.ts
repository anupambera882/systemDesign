import * as readline from "readline/promises";

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum PieceType {
  X = "X",
  O = "O",
}

class PlayingPiece {
  public pieceType: PieceType;

  constructor(pieceType: PieceType) {
    this.pieceType = pieceType;
  }
}

class PlayingPieceX extends PlayingPiece {
  public constructor() {
    super(PieceType.X);
  }
}

class PlayingPieceO extends PlayingPiece {
  public constructor() {
    super(PieceType.O);
  }
}

class Board {
  public size: number;
  public board: (PlayingPiece | null)[][];

  public constructor(size: number) {
    this.size = size;
    this.board = Array.from({ length: size }, () => new Array(size).fill(null));
  }

  public addPiece(
    row: number,
    column: number,
    playingPiece: PlayingPiece
  ): boolean {
    if (this.board[row][column] != null) {
      return false;
    }
    this.board[row][column] = playingPiece;
    return true;
  }

  public getFreeCells() {
    const freeCells: number[][] = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] == null) {
          freeCells.push([i, j]);
        }
      }
    }

    return freeCells;
  }

  public printBoard() {
    console.log("\nBoard:");
    for (let i = 0; i < this.size; i++) {
      const row = this.board[i]
        .map((cell) => (cell ? cell.pieceType : " "))
        .join(" | ");
      console.log(row);
      if (i < this.size - 1) {
        console.log("-".repeat(row.length)); // separator between rows
      }
    }
    console.log();
  }
}

class Player {
  public name: string;
  public playingPiece: PlayingPiece;

  public constructor(name: string, playingPiece: PlayingPiece) {
    this.name = name;
    this.playingPiece = playingPiece;
  }

  public getName(): string {
    return this.name;
  }

  public getPlayingPiece(): PlayingPiece {
    return this.playingPiece;
  }
}

class TicTacToeGame {
  private players: Player[];
  private gameBoard: Board;

  public constructor() {
    this.players = [];
    const player1 = new Player("Player1", new PlayingPieceX());
    const player2 = new Player("Player2", new PlayingPieceO());

    this.players.push(player1, player2);
    this.gameBoard = new Board(3);
  }

  public async startGame() {
    let noWinner = true;

    try {
      while (noWinner) {
        const playerTurn = this.players.shift()!;

        this.gameBoard.printBoard();
        const freeSpaces = this.gameBoard.getFreeCells();
        if (!freeSpaces.length) {
          noWinner = false;
          console.log("It's a tie!");
          break;
        }

        let validInput = false;
        let inputRow: number, inputColumn: number;
        while (!validInput) {
          const s = await read.question(
            `Player ${playerTurn.getName()}, enter row,column (0-2): `
          );
          const values = s.split(",");
          inputRow = Number(values[0]);
          inputColumn = Number(values[1]);

          if (
            isNaN(inputRow) ||
            isNaN(inputColumn) ||
            inputRow < 0 ||
            inputRow >= 3 ||
            inputColumn < 0 ||
            inputColumn >= 3
          ) {
            console.log("Invalid input. Please enter valid row and column.");
          } else if (
            !this.gameBoard.addPiece(
              inputRow,
              inputColumn,
              playerTurn.getPlayingPiece()
            )
          ) {
            console.log("Cell already occupied. Choose another.");
          } else {
            validInput = true;
          }
        }

        this.players.push(playerTurn);

        if (
          this.isThereWinner(
            inputRow!,
            inputColumn!,
            playerTurn.getPlayingPiece().pieceType
          )
        ) {
          this.gameBoard.printBoard();
          console.log(`Player ${playerTurn.getName()} wins!`);
          return playerTurn.getName();
        }
      }

      return "tie";
    } finally {
      read.close(); // Ensures the readline interface closes after the game ends.
    }
  }

  private isThereWinner(
    row: number,
    column: number,
    pieceType: PieceType
  ): boolean {
    return (
      this.checkRow(row, pieceType) ||
      this.checkColumn(column, pieceType) ||
      this.checkDiagonals(pieceType)
    );
  }

  private checkRow(row: number, pieceType: PieceType): boolean {
    return this.gameBoard.board[row].every(
      (piece) => piece != null && piece.pieceType === pieceType
    );
  }

  private checkColumn(column: number, pieceType: PieceType): boolean {
    return this.gameBoard.board.every(
      (row) => row[column] != null && row[column]!.pieceType === pieceType
    );
  }

  private checkDiagonals(pieceType: PieceType): boolean {
    const topLeftBottomRight = this.gameBoard.board.every(
      (row, i) => row[i] != null && row[i]!.pieceType === pieceType
    );
    const topRightBottomLeft = this.gameBoard.board.every(
      (row, i) =>
        row[this.gameBoard.size - i - 1] != null &&
        row[this.gameBoard.size - i - 1]!.pieceType === pieceType
    );
    return topLeftBottomRight || topRightBottomLeft;
  }
}

export default class DesignTicTacToeGame {
  public static main() {
    const game = new TicTacToeGame();
    game.startGame().then((result) => {
      console.log("Game result: " + result);
    });
  }
}

DesignTicTacToeGame.main();
