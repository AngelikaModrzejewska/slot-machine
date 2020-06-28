class Draw {
  constructor() {
    this.options = [
      "url(images/lemons.jpg)",
      "url(images/pears.jpg)",
      "url(images/strawberries.jpg)",
    ];
    let _result = this.drawResult();
    this.getDrawResult = () => _result;
  }

  drawResult() {
    let fruits = [];
    for (let i = 0; i < this.options.length; i++) {
      const index = Math.floor(Math.random() * this.options.length);
      const fruit = this.options[index];
      fruits.push(fruit);
    }
    return fruits;
  }
}
