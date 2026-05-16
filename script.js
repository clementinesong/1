const pageAudio = document.querySelector("#pageAudio");
const app = document.querySelector("#app");
const backButton = document.querySelector("#backButton");
const resetButton = document.querySelector("#resetButton");
const musicButton = document.querySelector("#musicButton");
const loveScore = document.querySelector("#loveScore");
const madnessScore = document.querySelector("#madnessScore");
const pageTitle = document.querySelector("#pageTitle");
const chapterLabel = document.querySelector("#chapterLabel");

function createInitialState() {
  return {
    love: 0,
    madness: 0,
    choices: {},
    page: "intro",
    history: [],
    musicEnabled: false,
  };
}

let state = loadState();

const pageFlow = {
  intro: "scene1",
  scene1: "option_phone",
  phone_a: "scene2",
  phone_b: "scene2",
  scene2: "option_corridor",
  corridor_a: "scene2_5",
  corridor_b: "scene2_5",
  scene2_5: "option_tease",
  tease_a: "scene3",
  tease_b: "scene3",
  scene3: "option_festival",
  festival_a: "scene4",
  festival_b: "scene4",
  scene4: "option_latecare",
  latecare_a: "scene5",
  latecare_b: "scene5",
  latecare_c: "scene5",
  scene5: "option_dress",
  dress_a: "ending",
  dress_b: "ending",
};

const pages = {
  intro: {
    type: "scene",
    chapter: "Start",
    title: "未命名互动文本",
    bgm: "入口页 BGM 待设计",
    text: "这是一个米白底色、适合手机阅读的互动文本原型。\n\n你可以先用这里的占位文字测试页面流转、数值统计、返回与结局判定。后续只需要替换 script.js 里的文本、选项说明和 bgmSrc。",
    prompt: "结构：5 个 scene，6 个 option。每个 scene / option / 选择结果都作为单独页面呈现。",
    button: "进入 Scene 1",
  },
  scene1: {
    type: "scene",
    chapter: "Scene 1",
    title: "电话",
    bgm: "Scene 1 BGM 待设计",
    text: "【固定文本待填】\n\n这里放第一章的固定场景文本。可以写电话铃声、房间空气、人物第一次被推到选择前的状态。",
    prompt: "下一页进入 Option：电话。",
    button: "查看选择",
  },
  scene2: {
    type: "scene",
    chapter: "Scene 2-1",
    title: "走廊争吵",
    bgm: "Scene 2 走廊 BGM 待设计",
    text: "【固定文本待填】\n\n这里放走廊争吵前后的固定文本。",
    prompt: "下一页进入 Option：走廊争吵。",
    button: "查看选择",
  },
  scene2_5: {
    type: "scene",
    chapter: "Scene 2-2",
    title: "被同学起哄",
    bgm: "Scene 2 起哄 BGM 待设计",
    text: "【固定文本待填】\n\n这里放被同学起哄的固定文本，承接走廊争吵后的状态。",
    prompt: "下一页进入 Option：被同学起哄。",
    button: "查看选择",
  },
  scene3: {
    type: "scene",
    chapter: "Scene 3",
    title: "校庆",
    bgm: "Scene 3 BGM 待设计",
    text: "【固定文本待填】\n\n这里放校庆前的固定文本。可以强调热闹、灯光、社交压力与暗处的窥视感。",
    prompt: "下一页进入 Option：校庆。",
    button: "查看选择",
  },
  scene4: {
    type: "scene",
    chapter: "Scene 4",
    title: "深夜照顾",
    bgm: "Scene 4 BGM 待设计",
    text: "【固定文本待填】\n\n这里是命运分歧点前的固定文本。可以写夜晚、发烧、距离过近、边界摇晃。",
    prompt: "下一页进入 Option：深夜照顾（三选一）。",
    button: "查看选择",
  },
  scene5: {
    type: "scene",
    chapter: "Scene 5",
    title: "裙子被毁之后",
    bgm: "Scene 5 BGM 待设计",
    text: "【固定文本待填】\n\n这里是最终转折点前的固定文本。可以写毁掉的裙子、沉默、愧疚或竞争欲。",
    prompt: "下一页进入最终 Option，并根据分值进入结局。",
    button: "查看最终选择",
  },
  option_phone: {
    type: "option",
    chapter: "Option 1 / CH1",
    title: "电话",
    bgm: "电话选项 BGM 待设计",
    text: "【选项引导待填】\n\n电话响起。你需要决定自己如何理解这段关系。",
    choices: [
      {
        key: "phone_a",
        label: "A. 默认是男朋友",
        note: "love +1",
        effects: { love: 1 },
        choiceKey: "ch1",
        choiceValue: "a",
        result: "【A 对应内容待填】\n\n他把这个答案在心里说得很自然，像一种已经发生的事实。",
      },
      {
        key: "phone_b",
        label: "B. 偷翻手机",
        note: "madness +1",
        effects: { madness: 1 },
        choiceKey: "ch1",
        choiceValue: "b",
        result: "【B 对应内容待填】\n\n屏幕光照亮他的脸，也照亮一点不肯承认的占有欲。",
      },
    ],
  },
  option_corridor: {
    type: "option",
    chapter: "Option 2 / CH2",
    title: "走廊争吵",
    bgm: "走廊争吵选项 BGM 待设计",
    text: "【选项引导待填】\n\n争吵被走廊的回声放大。她看着你，等你先说话。",
    choices: [
      {
        key: "corridor_a",
        label: "A. 流眼泪诉说委屈",
        note: "madness +1",
        effects: { madness: 1 },
        choiceKey: "ch2_1",
        choiceValue: "a",
        result: "【A 对应内容待填】\n\n眼泪先于解释落下来，委屈变成一种柔软的逼迫。",
      },
      {
        key: "corridor_b",
        label: "B. 拉袖子服软",
        note: "love +1",
        effects: { love: 1 },
        choiceKey: "ch2_1",
        choiceValue: "b",
        result: "【B 对应内容待填】\n\n他拉住她的袖口，像拉住最后一点可以退回去的余地。",
      },
    ],
  },
  option_tease: {
    type: "option",
    chapter: "Option 3 / CH2",
    title: "被同学起哄",
    bgm: "起哄选项 BGM 待设计",
    text: "【选项引导待填】\n\n笑声从四面围过来，关系被迫在众人面前获得一个名字。",
    choices: [
      {
        key: "tease_a",
        label: "A. “这是我姐，不，我哥”",
        note: "love +1",
        effects: { love: 1 },
        choiceKey: "ch2_2",
        choiceValue: "a",
        result: "【A 对应内容待填】\n\n他慌乱地改口，像是在替彼此找一个还能被接受的位置。",
      },
      {
        key: "tease_b",
        label: "B. 沉默拉手",
        note: "madness +1",
        effects: { madness: 1 },
        choiceKey: "ch2_2",
        choiceValue: "b",
        result: "【B 对应内容待填】\n\n他没有解释，只把手握得更紧。沉默反而像公开宣告。",
      },
    ],
  },
  option_festival: {
    type: "option",
    chapter: "Option 4 / CH3",
    title: "校庆",
    bgm: "校庆选项 BGM 待设计",
    text: "【选项引导待填】\n\n她本来要去见另一个人。消息框里的光标闪烁着。",
    choices: [
      {
        key: "festival_a",
        label: "A. 发消息截胡",
        note: "madness +1；死亡隐藏线条件之一",
        effects: { madness: 1 },
        choiceKey: "ch3",
        choiceValue: "a",
        result: "【A 对应内容待填】\n\n消息发出去的一刻，他听见某种东西轻轻越过了线。",
      },
      {
        key: "festival_b",
        label: "B. 说不去了",
        note: "love +1",
        effects: { love: 1 },
        choiceKey: "ch3",
        choiceValue: "b",
        result: "【B 对应内容待填】\n\n他把手机扣下去，假装这一次的放手不是因为害怕。",
      },
    ],
  },
  option_latecare: {
    type: "option",
    chapter: "Option 5 / CH4",
    title: "深夜照顾",
    bgm: "深夜照顾选项 BGM 待设计",
    text: "【选项引导待填】\n\n命运分歧点。欲望、边界和关系本身在同一个夜晚相互拉扯。",
    choices: [
      {
        key: "latecare_a",
        label: "A. 去浴室自己解决",
        note: "love +0.5；madness +0.5；青春期混乱",
        effects: { love: 0.5, madness: 0.5 },
        choiceKey: "ch4",
        choiceValue: "a",
        result: "【A 对应内容待填】\n\n欲望存在，但他还试图把它关在门后。",
      },
      {
        key: "latecare_b",
        label: "B. 抱着姐姐忍耐",
        note: "madness +1；越界；死亡隐藏线条件之一",
        effects: { madness: 1 },
        choiceKey: "ch4",
        choiceValue: "b",
        result: "【B 对应内容待填】\n\n他明知不对，却仍然靠近。忍耐成了另一种不肯停止。",
      },
      {
        key: "latecare_c",
        label: "C. 发呆直到天亮",
        note: "love +1；更在意关系本身",
        effects: { love: 1 },
        choiceKey: "ch4",
        choiceValue: "c",
        result: "【C 对应内容待填】\n\n天快亮时，他意识到自己害怕失去的不是一个夜晚。",
      },
    ],
  },
  option_dress: {
    type: "option",
    chapter: "Option 6 / CH5",
    title: "姐姐被毁掉裙子后",
    bgm: "最终选择 BGM 待设计",
    text: "【选项引导待填】\n\n最终转折点。一个选择会主动降温，另一个选择会让占有欲压过道德。",
    choices: [
      {
        key: "dress_a",
        label: "A. 忏悔与安慰",
        note: "love +1.5；madness -1；饥荒线核心节点",
        effects: { love: 1.5, madness: -1 },
        choiceKey: "ch5",
        choiceValue: "a",
        result: "【A 对应内容待填】\n\n他终于承认自己伤害了她，并第一次试着把手收回来。",
      },
      {
        key: "dress_b",
        label: "B. “他哪里比我好？”",
        note: "love +0.5；madness +1.5；战争/死亡线核心节点",
        effects: { love: 0.5, madness: 1.5 },
        choiceKey: "ch5",
        choiceValue: "b",
        result: "【B 对应内容待填】\n\n问题出口后，所有温柔都变成了比较、嫉妒和争夺。",
      },
    ],
  },
};

function createResultPages() {
  Object.values(pages)
    .filter((page) => page.type === "option")
    .flatMap((page) => page.choices)
    .forEach((choice) => {
      pages[choice.key] = {
        type: "result",
        chapter: "Choice Result",
        title: choice.label,
        bgm: `${choice.label} 结果 BGM 待设计`,
        text: choice.result,
        prompt: `数值变化：${choice.note}`,
        button: pageFlow[choice.key] === "ending" ? "查看结局" : "继续",
      };
    });
}

const endings = {
  瘟疫: {
    title: "END 1：瘟疫",
    bgm: "瘟疫结局 BGM 待设计",
    keywords: "潮湿 / 夏天 / 不说破 / 旧伤口 / 习惯",
    text: "【结局文案待填】\n\n他们后来都默契地不再提起那件事。",
  },
  饥荒: {
    title: "END 2：饥荒",
    bgm: "饥荒结局 BGM 待设计",
    keywords: "克制 / 长大 / 空缺 / 忍耐",
    text: "【结局文案待填】\n\n有些感情，活下来就已经足够痛苦。",
  },
  战争: {
    title: "END 3：战争",
    bgm: "战争结局 BGM 待设计",
    keywords: "排他 / 对抗 / 嫉妒 / 地下关系",
    text: "【结局文案待填】\n\n他们开始讨厌所有靠近彼此的人。",
  },
  死亡: {
    title: "HIDDEN END：死亡",
    bgm: "死亡结局 BGM 待设计",
    keywords: "炫耀 / 暴露 / 自毁 / 献祭",
    text: "【隐藏结局文案待填】\n\n既然世界不允许，那就让世界亲眼看着。",
  },
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("interactiveTextState")) || {};
    return { ...createInitialState(), ...saved, choices: { ...(saved.choices || {}) } };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem("interactiveTextState", JSON.stringify(state));
}

function formatScore(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function updateScoreboard() {
  loveScore.textContent = formatScore(state.love);
  madnessScore.textContent = formatScore(state.madness);
  backButton.disabled = state.history.length === 0;
}

function setMusic(meta) {
  musicButton.textContent = `BGM：${meta.bgm || "待设计"}`;
  if (meta.bgmSrc) {
    pageAudio.src = meta.bgmSrc;
    musicButton.disabled = false;
    if (state.musicEnabled) {
      pageAudio.play().catch(() => {
        state.musicEnabled = false;
        saveState();
      });
    }
  } else {
    pageAudio.removeAttribute("src");
    pageAudio.pause();
    musicButton.disabled = true;
  }
}

function goTo(page, options = {}) {
  if (options.recordHistory !== false) {
    state.history.push(snapshotState());
  }
  state.page = page;
  saveState();
  render();
}

function snapshotState() {
  return {
    love: state.love,
    madness: state.madness,
    choices: { ...state.choices },
    page: state.page,
  };
}

function applyChoice(choice) {
  const beforeChoice = snapshotState();
  const effects = choice.effects || {};
  state.love += effects.love || 0;
  state.madness = Math.max(0, state.madness + (effects.madness || 0));
  state.choices[choice.choiceKey] = choice.choiceValue;
  state.history.push(beforeChoice);
  state.page = choice.key;
  saveState();
  render();
}

function endingCheck() {
  const ch3 = state.choices.ch3;
  const ch4 = state.choices.ch4;
  const ch5 = state.choices.ch5;

  if (state.madness >= 5.5 && ch3 === "a" && ch4 === "b" && ch5 === "b") {
    return "死亡";
  }

  if (state.madness >= 4.5 && state.love >= 2 && ch5 === "b") {
    return "战争";
  }

  if (state.love >= 4.5 && state.madness <= 2 && ch5 === "a") {
    return "饥荒";
  }

  return "瘟疫";
}

function render() {
  updateScoreboard();

  if (state.page === "ending") {
    return renderEnding();
  }

  const page = pages[state.page] || pages.intro;
  pageTitle.textContent = page.title;
  chapterLabel.textContent = page.chapter;
  setMusic(page);

  if (page.type === "option") {
    app.innerHTML = `
      <p class="kicker">${page.chapter}</p>
      <p class="prose">${page.text}</p>
      <div class="choices">
        ${page.choices
          .map(
            (choice, index) => `
              <button class="choice-button" type="button" data-choice-index="${index}">
                <strong>${choice.label}</strong>
                <span>${choice.note}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    `;

    app.querySelectorAll("[data-choice-index]").forEach((button) => {
      button.addEventListener("click", () => applyChoice(page.choices[Number(button.dataset.choiceIndex)]));
    });
    return;
  }

  app.innerHTML = `
    <p class="kicker">${page.chapter}</p>
    <p class="prose">${page.text}</p>
    ${page.prompt ? `<div class="prompt-box">${page.prompt}</div>` : ""}
    <div class="actions">
      <button class="primary-button" type="button" id="nextButton">${page.button || "继续"}</button>
    </div>
  `;

  app.querySelector("#nextButton").addEventListener("click", () => goTo(pageFlow[state.page] || "ending"));
}

function renderEnding() {
  const endingName = endingCheck();
  const ending = endings[endingName];
  pageTitle.textContent = ending.title;
  chapterLabel.textContent = "Ending";
  setMusic(ending);
  app.innerHTML = `
    <span class="ending-mark">${endingName}</span>
    <p class="kicker">${ending.keywords}</p>
    <p class="prose">${ending.text}</p>
    <p class="score-note">最终数值：Love ${formatScore(state.love)} / Madness ${formatScore(state.madness)}</p>
    <div class="actions">
      <button class="primary-button" type="button" id="restartButton">重新开始</button>
    </div>
  `;
  updateScoreboard();
  app.querySelector("#restartButton").addEventListener("click", resetGame);
}

function resetGame() {
  const musicEnabled = state.musicEnabled;
  state = { ...createInitialState(), musicEnabled };
  saveState();
  render();
}

backButton.addEventListener("click", () => {
  const previous = state.history.pop();
  if (!previous) return;
  state = { ...state, ...previous, history: state.history };
  saveState();
  render();
});

resetButton.addEventListener("click", resetGame);

musicButton.addEventListener("click", () => {
  if (!pageAudio.src) return;
  state.musicEnabled = !state.musicEnabled;
  if (state.musicEnabled) {
    pageAudio.play();
  } else {
    pageAudio.pause();
  }
  saveState();
});

createResultPages();
render();
