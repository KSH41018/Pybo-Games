const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

class Unit {
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    target.hp -= this.att;
  }
}

class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0);
    this.lv = 1;
  }

  heal(monster) {
    this.hp += this.maxHp / 0.2 + this.att;
  }
  getXp(xp) {
    this.xp += xp;
    if (this.xp >= this.lv * 15) {
      this.xp -= this.lv * 15;
      this.lv += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! ${this.lv}레벨 달성!`);
    }
  }
}

class Monster extends Unit {
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  }
}

let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  game = new Game(name);
});

class Game {
  constructor(name) {
    this.monster = null; // this는 기본적으로 window 라고 생각 .bind로 변경 가능 (화살표 함수는 무조건 밖에 this를 가져옴) this 사용할 땐 어디서 실행되는지 확인
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 },
    ];
    this.start(name);
  }

  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }

  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;

    if (input === '1') {
      //모험
      this.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      this.updateMonsterStat();
      this.showMessage(`${this.monster.name}이 나타났다.`);
    } else if (input === '2') {
      // 휴식
      this.hero.hp = this.hero.maxHp;
      this.updateHeroStat();
      this.showMessage('충분한 휴식을 취했다.');
    } else if (input === '3') {
      // 종료
      this.showMessage(' ');
      this.quit();
    }
  };

  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') {
      //공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (monster.hp <= 0) {
        this.showMessage(
          `${monster.name}을 쓰러트렸다. ${monster.xp} 경험치를 얻었다.`
        );
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else if (hero.hp <= 0) {
        this.showMessage(
          `${hero.lv} 레벨에서 ${monster.name}에 의해 ${hero.name}는 사망했다.`
        );
        this.quit();
      } else {
        this.showMessage(
          `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
        );
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') {
      // 회복
      const { hero, monster } = this;
      hero.hp = Math.min(hero.maxHp, hero.hp + hero.maxHp / 0.3 + hero.lv * 10);
      monster.attack(hero);
      this.showMessage('체력을 조금 회복했다!');
      this.updateHeroStat();
    } else if (input === '3') {
      // 도망
      this.changeScreen('game');
      this.showMessage('부리나케 도망쳤다!');
      this.monster = null;
      this.updateMonsterStat();
    }
  };

  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }

  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lv}LV`;
    $heroHp.textContent = `HP : ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `Xp : ${hero.xp}/${15 * hero.lv}`;
    $heroAtt.textContent = `ATT : ${hero.att}`;
  }

  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP : ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT : ${monster.att}`;
  }

  showMessage(text) {
    $message.textContent = text;
  }
  quit() {
    this.hero = null;
    this.monster = null;
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    this.updateHeroStat();
    this.updateMonsterStat();
    game = null;
  }
}
