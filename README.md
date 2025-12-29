# 🎮 Tetris Reloaded

**A Modern Twist on a Timeless Classic**

Experience the retro game you love with exciting new features! Tetris Reloaded brings fresh designs, dynamic power-ups, and innovative gameplay mechanics to the iconic puzzle game. Dive into a reimagined version that elevates the classic Tetris experience.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🌟 What Makes It "Reloaded"

While staying true to the classic Tetris gameplay, Tetris Reloaded introduces exciting new features:

### ⚡ Power-Up System
Five unique power-ups that change the game:
- **🚀 2x Speed** - Temporarily doubles your falling speed
- **💰 Bonus Points** - Instant +100 score boost
- **✨ 2x Points** - Double points for every line cleared (1 minute)
- **🧹 Clear Grid** - Removes all blocks from the grid
- **🔄 Reverse Controls** - Flips your keyboard controls (1 minute challenge!)

### 🎨 Modern Visual Design
- Custom colored blocks (blue, pink, purple, peach, yellow)
- Image-based block textures
- Next piece preview system
- Real-time score and lines tracking
- Power-up status display

### 🎯 Enhanced Gameplay
- Smooth keyboard controls (WASD or Arrow Keys)
- Automatic power-up activation every 10 points
- Random power-up selection for unpredictability
- Classic Tetris shapes with modern visuals

---

## 🕹️ Game Features

### Classic Tetris Mechanics
- **5 Tetromino Shapes:** L-Shape, Z-Shape, T-Shape, O-Shape (Square), I-Shape (Line)
- **Rotation System:** Rotate pieces with W or Up Arrow
- **Movement Controls:** A/D or Left/Right Arrows
- **Fast Drop:** S or Down Arrow
- **Line Clearing:** Complete rows to score points
- **Increasing Difficulty:** Game progressively gets challenging

### New Features

#### Power-Up System
Power-ups activate automatically every 10 points:

**1. 2x Speed (Slow):**
```javascript
- Doubles falling speed to 500ms
- Lasts for 1 minute
- Returns to normal speed after duration
- Tests your reflexes!
```

**2. Bonus Points:**
```javascript
- Instant +100 points added to score
- Great for climbing leaderboards
- Appears randomly in power-up rotation
```

**3. 2x Points (Double):**
```javascript
- Lines clear for 20 points instead of 10
- Lasts for 1 minute
- Maximize your score during this time!
```

**4. Clear Grid:**
```javascript
- Removes ALL blocks from the grid
- Fresh start without losing your score
- Perfect for when things get overwhelming
```

**5. Reverse Controls:**
```javascript
- Left becomes Right
- Right becomes Left
- Rotate becomes Drop
- Drop becomes Rotate
- Ultimate challenge for 1 minute!
```

### Scoring System
- **10 points** per line cleared (standard)
- **20 points** per line when 2x Points power-up is active
- **+100 bonus** when Bonus Points power-up activates
- **Lines counter** tracks total rows cleared

---

## 🎮 Controls

### Standard Controls

**Keyboard (Arrow Keys):**
- ⬅️ **Left Arrow** - Move piece left
- ➡️ **Right Arrow** - Move piece right
- ⬆️ **Up Arrow** - Rotate piece
- ⬇️ **Down Arrow** - Fast drop

**Keyboard (WASD):**
- **A** - Move piece left
- **D** - Move piece right
- **W** - Rotate piece
- **S** - Fast drop

**Game Controls:**
- **Start/Pause Button** - Toggle game play

### Reverse Controls (Power-Up Active)

When Reverse Controls power-up activates:
- ⬅️ **Left/A** → Moves piece **RIGHT**
- ➡️ **Right/D** → Moves piece **LEFT**
- ⬆️ **Up/W** → **Fast drop**
- ⬇️ **Down/S** → **Rotate piece**

*Lasts for 60 seconds - Stay focused!*

---

## 🏗️ Technical Implementation

### Grid System

**Main Grid:**
- 10 columns × 25 rows = 250 cells
- Additional 10 cells for the floor (block3 class)
- Total: 260 grid cells

**Preview Grid:**
- 4×4 mini-grid for next piece display
- Shows upcoming tetromino shape
- Color-coded to match falling piece

### Game Architecture

```javascript
Key Components:
├── Grid Creation (createGrid)
├── Shape Definitions (5 tetrominoes × 4 rotations)
├── Movement System (left, right, down, rotate)
├── Collision Detection (edges, other blocks)
├── Freeze System (piece locking)
├── Line Clearing (score calculation)
├── Power-Up System (5 unique power-ups)
└── Game Over Detection
```

### Core Functions

#### `draw()` & `undraw()`
Renders and removes pieces on the grid:
```javascript
- Adds/removes 'block' class
- Sets background images for colored blocks
- Updates grid display in real-time
```

#### `moveDown()`
Main game loop function:
```javascript
- Called every 1000ms (1 second)
- Moves piece down one row
- Triggers freeze() to check for landing
- Adjusts speed with power-ups
```

#### `freeze()`
Handles piece landing:
```javascript
- Detects collision with floor or other blocks
- Converts 'block' to 'block2' (locked)
- Spawns next piece
- Checks game over condition
```

#### `rotate()`
Piece rotation system:
```javascript
- Cycles through 4 rotation states
- Each tetromino has unique rotation patterns
- Prevents invalid rotations at edges
```

#### `addScore()`
Line clearing and scoring:
```javascript
- Checks all 25 rows for completion
- Clears full rows
- Updates score (+10 or +20)
- Triggers power-up at multiples of 10
- Shifts blocks down after clearing
```

#### `activatePowerUp()`
Power-up selection and execution:
```javascript
- Randomly selects from 5 power-ups
- Implements unique effect for each
- Updates display to show active power-up
- Manages timers for timed effects
```

---

## 🛠️ Installation & Setup

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tetris-reloaded.git
   cd tetris-reloaded
   ```

2. **File Structure:**
   ```
   tetris-reloaded/
   ├── index.html
   ├── style.css
   ├── app.js
   ├── images/
   │   ├── blue_block.png
   │   ├── pink_block.png
   │   ├── purple_block.png
   │   ├── peach_block.png
   │   └── yellow_block.png
   └── README.md
   ```

3. **Add Block Images:**
   - Create an `images` folder
   - Add 5 block texture images (or use solid colors)
   - Update paths in `colors` array if needed

4. **Open and Play:**
   ```bash
   # Simply open index.html in your browser
   # No build process required!
   ```

---

## 🎯 Gameplay Strategy

### Beginner Tips
1. **Learn the Shapes** - Familiarize yourself with all 5 tetrominoes
2. **Plan Ahead** - Use the next piece preview
3. **Keep It Low** - Don't let pieces stack too high
4. **Clear Multiple Lines** - More efficient than single lines
5. **Use Fast Drop** - Speed up piece placement with S/Down

### Advanced Strategies
1. **Power-Up Timing** - Activate at 10, 20, 30... points
2. **2x Points Optimization** - Clear as many lines as possible during double points
3. **Reverse Control Prep** - Clear some space before this power-up activates
4. **Clear Grid Strategy** - Save difficult situations with this power-up
5. **Speed Management** - Adapt quickly to 2x Speed power-up

### Scoring Maximization
```
Standard Line: 10 points
Double Points Line: 20 points
Bonus Power-Up: +100 points
Strategy: Trigger power-ups frequently (every 10 points)
```

---

## 🎮 Game Mechanics Deep Dive

### Collision Detection

**Right Edge:**
```javascript
const isAtRightEdge = current.some(index => 
    (currentPosition + index) % width === width - 1
)
```

**Left Edge:**
```javascript
const isAtLeftEdge = current.some(index => 
    (currentPosition + index) % width === 0
)
```

**Bottom/Other Blocks:**
```javascript
if (current.some(index => 
    squares[currentPosition + index + width].classList.contains('block3') || 
    squares[currentPosition + index + width].classList.contains('block2')
))
```

### Rotation System

Each tetromino has 4 rotation states:
```javascript
const lShape = [
    [1, Width+1, Width*2+1, 2],           // Rotation 0
    [Width, Width+1, Width+2, Width*2+2],  // Rotation 1
    [1, Width+1, Width*2+1, Width*2],      // Rotation 2
    [Width, Width*2, Width*2+1, Width*2+2] // Rotation 3
]
```

Rotation cycles through states:
```javascript
currentRotation++
if (currentRotation === 4) {
    currentRotation = 0  // Loop back to start
}
```

### Line Clearing Algorithm

```javascript
1. Loop through all 25 rows
2. For each row, create array of all 10 positions
3. Check if ALL positions contain 'block2' (locked block)
4. If true:
   - Add score (10 or 20 points)
   - Remove 'block2' class from all positions
   - Splice row from squares array
   - Concat removed squares to top of grid
   - Re-append all squares to DOM
5. Continue to next row
```

---

## 🚀 Future Enhancements

**Gameplay Features:**
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Hold piece functionality
- [ ] Ghost piece (shows landing position)
- [ ] Combo system for clearing multiple lines
- [ ] Level progression with increasing speed
- [ ] Special tetromino shapes
- [ ] Multiplayer mode

**Power-Up Expansion:**
- [ ] Slow Motion (opposite of 2x speed)
- [ ] Bomb (clears area around piece)
- [ ] Magnet (auto-centers pieces)
- [ ] Time Freeze (pause automatic dropping)
- [ ] Rainbow blocks (wild card color)
- [ ] Shield (one-time save from game over)

**Technical Improvements:**
- [ ] Local storage for high scores
- [ ] Leaderboard system
- [ ] Sound effects and music
- [ ] Mobile touch controls
- [ ] Customizable controls
- [ ] Statistics tracking
- [ ] Replay system
- [ ] Pause menu

**Visual Enhancements:**
- [ ] Particle effects on line clear
- [ ] Animated power-up transitions
- [ ] Custom themes
- [ ] Background animations
- [ ] Smooth piece movements
- [ ] Score pop-ups

---
## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
