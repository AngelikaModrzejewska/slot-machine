class Game {
  constructor(start) {
    this.stats = new Statistics();
    this.wallet = new Wallet(start);

    document
      .getElementById("start")
      .addEventListener("click", this.startGame.bind(this));
    this.spanWallet = document.querySelector(".panel span.wallet");
    this.boards = [...document.querySelectorAll("div.fruit")];
    this.inputBid = document.getElementById("bid");
    this.spanResult = document.querySelector(".score span.result");
    this.spanGames = document.querySelector(".score span.number");
    this.spanWins = document.querySelector(".score span.win");
    this.spanLosses = document.querySelector(".score span.loss");

    this.render();
  }

  render(
    fruits = [
      "url(images/lemons.jpg)",
      "url(images/lemons.jpg)",
      "url(images/lemons.jpg)",
    ],
    money = this.wallet.getWalletValue(),
    result = "",
    stats = [0, 0, 0],
    bid = 0,
    wonMoney = 0
  ) {
    this.boards.forEach((board, i) => {
      board.style.backgroundImage = fruits[i];
    });
    this.spanWallet.textContent = money;
    if (result) {
      result = `You won ${wonMoney}$. `;
    } else if (!result && result !== "") {
      result = `You lost ${bid}$. `;
    }
    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
    this.inputBid.value = "";
  }

  startGame() {
    if (this.inputBid.value < 1) return alert("Your bid is too small!");
    //console.log(typeof this.inputBid.value);
    const bid = Math.floor(this.inputBid.value); //when someone want to play with a float number but also to make a number of this.inputBid.value, because it is a string

    if (!this.wallet.checkCanPlay(bid)) {
      return alert("You have not enough money!");
    }

    this.wallet.changeWallet(bid, "-");

    this.draw = new Draw();
    const fruits = this.draw.getDrawResult();
    const win = Result.checkWinner(fruits);
    const wonMoney = Result.moneyWinInGame(win, bid);
    this.wallet.changeWallet(wonMoney);
    this.stats.addGameToStatistics(win, bid);

    this.render(
      fruits,
      this.wallet.getWalletValue(),
      win,
      this.stats.showGameStatistics(),
      bid,
      wonMoney
    );
  }
}
