let seaweeds = []; // 存儲海草的數據
let colors = ["#FF6666", "#FF9966", "#FFCC66", "#66CC99", "#6699CC"]; // 更深的馬卡龍顏色

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30); // 調整動畫的幀率

  let seaweedCount = 40; // 海草的數量
  for (let i = 0; i < seaweedCount; i++) {
    let baseX = (i + 0.5) * (width / seaweedCount); // 平均分布於畫布寬度
    let baseY = height; // 每條海草的底部 y 座標固定在畫布底部
    let segments = 10; // 每條海草的節點數量
    let maxHeight = random(200, 300); // 每條海草的高度隨機
    let segmentLength = maxHeight / segments; // 每個節點的長度
    let strokeWidth = random(30, 60); // 每條海草的寬度隨機
    let seaweedColor = random(colors); // 每條海草的顏色隨機
    let swayRange = random(10, 30); // 每條海草的左右搖擺範圍隨機

    // 將海草的數據存儲起來
    seaweeds.push({ baseX, baseY, segments, segmentLength, strokeWidth, seaweedColor, swayRange });
  }

  // 設置畫布背景透明
  clear();
}

function draw() {
  clear(); // 清除畫布，保持透明背景

  // 設定混合模式為 MULTIPLY，讓顏色重疊時變暗
  blendMode(MULTIPLY);

  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];
    let { baseX, baseY, segments, segmentLength, strokeWidth, seaweedColor, swayRange } = seaweed;

    // 設定線條顏色和透明度
    let colWithAlpha = color(seaweedColor); // 使用 p5.js 的 color 函數
    colWithAlpha.setAlpha(50); // 設定透明度為 50，讓顏色更深
    stroke(colWithAlpha); // 設定線條顏色
    strokeWeight(strokeWidth); // 設定線條粗細

    beginShape(); // 開始繪製連續的線條
    for (let j = 0; j < segments; j++) {
      // 計算每個節點的位置
      let offsetX = j === 0 ? 0 : sin(frameCount * 0.02 + j * 0.2 + i) * swayRange; // 使用 swayRange 控制搖擺幅度
      let currentX = baseX + offsetX;
      let currentY = baseY - j * segmentLength;

      // 添加頂點到形狀中
      vertex(currentX, currentY);
    }
    endShape(); // 結束繪製連續的線條
  }

  // 恢復混合模式為正常
  blendMode(BLEND);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}