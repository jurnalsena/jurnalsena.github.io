<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyCrush - Idle Clicker</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" href="assets/img/favicons/logo.png">
    <link rel="stylesheet" href="fonts/fontawesome-webfont.woff2">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <!-- Main Menu Modal -->
    <div id="mainMenuModal" class="modal active">
        <div class="modal-content">
            <div class="logo-container">
                <img src="assets/img/logo.png" alt="MyCrush" class="logo">
                <h1>MyCrush</h1>
                <p>Idle Clicker Waifu</p>
            </div>
            <div class="menu-buttons">
                <button id="startGameBtn" class="menu-btn">Start Game</button>
                <button id="settingsBtn" class="menu-btn">Settings</button>
                <button id="aboutBtn" class="menu-btn">About</button>
            </div>
        </div>
    </div>

    <!-- Username Input Modal -->
    <div id="usernameModal" class="modal">
        <div class="modal-content">
            <h2>Enter Your Name</h2>
            <div class="input-container">
                <input type="text" id="usernameInput" placeholder="Enter your name..." maxlength="20">
                <button id="confirmUsernameBtn" class="menu-btn">Start Adventure</button>
            </div>
        </div>
    </div>

    <!-- Settings Modal -->
    <div id="settingsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Settings</h2>
                <button class="close-btn" onclick="closeModal('settingsModal')">&times;</button>
            </div>
            <div class="settings-content">
                <div class="setting-group">
                    <label>Sound Effects:</label>
                    <input type="checkbox" id="soundToggle" checked>
                </div>
                <div class="setting-group">
                    <label>Background Music:</label>
                    <input type="checkbox" id="musicToggle" checked>
                </div>
                <div class="setting-group">
                    <label>Particle Effects:</label>
                    <input type="checkbox" id="particleToggle" checked>
                </div>
                <div class="setting-group">
                    <label>Music Volume:</label>
                    <input type="range" id="musicVolumeSlider" min="0" max="100" value="30" class="volume-slider">
                    <span id="volumeDisplay">30%</span>
                </div>

            </div>
            <div class="settings-buttons">
                <button id="saveSettingsBtn" class="menu-btn">Save Settings</button>
                <button id="resetProgressBtn" class="menu-btn reset-btn">Reset Progress</button>
                <button id="exportSaveBtn" class="menu-btn" style="display: none;">Export Save Data</button>
                <button id="importSaveBtn" class="menu-btn" style="display: none;">Import Save Data</button>
                <input type="file" id="importSaveInput" accept=".json" style="display:none;" />
            </div>
        </div>
    </div>

    <!-- Character Selection Modal -->
    <div id="characterModal" class="modal">
        <div class="modal-content character-modal">
            <div class="modal-header">
                <h2>Choose Your Character</h2>
                <button class="close-btn" onclick="closeModal('characterModal')">&times;</button>
            </div>
            <div class="character-modal-content">
                <div id="characterList" class="character-list">
                    <!-- Characters will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <!-- Outfit Selection Modal -->
    <div id="outfitModal" class="modal">
        <div class="modal-content outfit-modal">
            <div class="modal-header">
                <h2>Choose Outfit</h2>
                <button class="close-btn" onclick="closeModal('outfitModal')">&times;</button>
            </div>
            <div class="outfit-modal-content">
                <div class="current-outfit">
                    <h3>Current Outfit</h3>
                    <div id="currentOutfitDisplay" class="current-outfit-display">
                        <!-- Current outfit will be displayed here -->
                    </div>
                </div>
                <div class="outfit-selection">
                    <h3>Available Outfits</h3>
                    <div id="outfitList" class="outfit-list">
                        <!-- Outfits will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- Online Gift Modal -->
    <div id="onlineGiftModal" class="modal">
        <div class="modal-content online-gift-modal">
            <div class="modal-header">
                <h2>⏰ Online Gift</h2>
                <button class="close-btn" onclick="closeModal('onlineGiftModal')">&times;</button>
            </div>
            <div class="online-gift-content">
                <div class="online-time-info">
                    <div class="time-counter">
                        <span class="time-number" id="onlineTimeDisplay">00:00</span>
                        <span class="time-label">Time Online</span>
                    </div>
                </div>
                <div class="online-rewards-preview">
                    <h3>Available Rewards:</h3>
                    <div id="onlineRewardsList" class="online-rewards-list">
                        <!-- Online rewards will be displayed here -->
                    </div>
                </div>
                <div id="onlineGiftResult" class="online-gift-result hidden">
                    <!-- Claim result will be displayed here -->
                </div>
                <button id="resetOnlineGiftBtn" class="menu-btn" style="display:none; margin-top:18px;">Reset Time</button>
            </div>
        </div>
    </div>



    <!-- About Modal -->
    <div id="aboutModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>About & Statistics</h2>
                <button class="close-btn" onclick="closeModal('aboutModal')">&times;</button>
            </div>
            <div class="about-content">
                <div class="about-game" style="margin-bottom: 30px;">
                    <h3>About Game</h3>
                    <div class="about-game-desc">
                        <p><b>MyCrush - Idle Clicker</b> is an idle clicker game that combines elements of love simulation, character collection, and an upgrade system. Click on your favorite characters to collect love points, gold, and unlock various special items and outfits!</p>
                        <ul style="margin: 10px 0 0 18px; padding-left: 0;">
                        <li>✨ Collect unique characters and outfits</li>
                        <li>🛍️ Upgrade items & boosts for faster progress</li>
                        <li>🎵 Interactive background music and sound effects</li>
                        <li>📈 Complete statistics & online rewards</li>
                        </ul>
                        <p style="margin-top: 10px; color: #888; font-size: 0.95em;">Developed by <b>Cyberus Studio</b>.<br>Discover all the features in the menu and enjoy your virtual love adventure!</p>
                    </div>
                </div>
                <div class="player-stats">
                    <h3>Player Statistics</h3>
                    <div class="stat-item">
                        <span>Username:</span>
                        <span id="statUsername">-</span>
                    </div>
                    <div class="stat-item">
                        <span>Player Level:</span>
                        <span id="statLevel">1</span>
                    </div>
                    <div class="stat-item">
                        <span>Player Experience:</span>
                        <span id="statExperience">0</span>
                    </div>
                    <div class="stat-item">
                        <span>Total Clicks:</span>
                        <span id="statTotalClicks">0</span>
                    </div>
                    <div class="stat-item">
                        <span>Total Love Points:</span>
                        <span id="statTotalLove">0</span>
                    </div>
                    <div class="stat-item">
                        <span>Total Gold Earned:</span>
                        <span id="statTotalGold">0</span>
                    </div>
                    <div class="stat-item">
                        <span>Total Crush Coin:</span>
                        <span id="statCrushCoin">0</span>
                    </div>
                    <div class="stat-item">
                        <span>Play Time:</span>
                        <span id="statPlayTime">00:00:00</span>
                    </div>
                </div>
                <div align="center">
                    <button id="exportPdfBtn" class="menu-btn" style="margin-top: 5px;margin-bottom: 8px;">Export Player Statistics</button>
                </div>
                <br>
                <div class="character-stats">
                    <h3>Character Progress</h3>
                    <div id="characterStatsList"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Game Container -->
    <div id="gameContainer" class="game-container hidden">
        <!-- Header -->
        <div class="game-header">
            <div class="player-info">
                <span id="playerName">Player</span>
                <div class="player-level-info">
                    <span class="level">Level <span id="playerLevel">1</span></span>
                    <div class="exp-bar">
                        <div class="exp-fill" id="expFill"></div>
                        <span class="exp-text" id="expText">0 / 100</span>
                    </div>
                </div>
            </div>
            <div class="currency-info">
                <div class="gold-display">
                    <img src="assets/img/gold.png" alt="Gold" class="gold-icon">
                    <span id="goldAmount">0</span>
                </div>
                <div class="crush-display" style="margin-left:12px;">
                    <img src="assets/img/crushcoin2.png" alt="Crush Coin" class="crush-icon">
                    <span id="crushCoinAmount">0</span>
                </div>
            </div>
                        <div class="header-buttons">
                <button id="menuBtn" class="header-btn" style="display: none;">☰</button>
                <button id="musicToggleBtn" class="header-btn" style="display: none;">🎵</button>
                <button id="onlineGiftBtn" class="header-btn">⏰</button>
                <button id="settingsBtnGame" class="header-btn">⚙️</button>
                <button id="aboutBtnGame" class="header-btn">ℹ️</button>
            </div>
        </div>

        <!-- Character Selection Button -->
        <div class="character-selection-btn">
            <button id="characterSelectBtn" class="menu-btn">Choose Character</button>
            <button id="backgroundBtn" class="menu-btn" title="Change Background" style="margin-left: 12px;">Change Background</button>
            <button id="redeemCodeBtn" class="menu-btn" style="margin-left: 12px;">Redeem Code</button>
        </div>

        <!-- Main Game Area -->
        <div class="game-area">
            <div class="background-container">
                <img src="assets/img/background/cute_room.png" alt="Cute Room" class="background">
                <div id="interiorContainer"></div>
                <div id="characterDisplay" class="character-display">
                    <!-- Selected character will be displayed here -->
                </div>
                <div id="loveParticles" class="love-particles"></div>
            </div>
        </div>

        <!-- Character Info -->
        <div class="character-info">
            <div class="character-name" id="currentCharacterName">Select a Character</div>
            <div class="love-bar">
                <div class="love-fill" id="loveFill"></div>
                <span class="love-text" id="loveText">0 / 100</span>
            </div>
            <div class="character-level">💕 Level <span id="characterLevel">0</span></div>
            <button id="outfitBtn" class="outfit-btn" style="display: none;">Change Outfit</button>
            <div class="interior-action-btns" style="display: flex; gap: 10px; margin-top: 10px;">
                <button id="shopBtn" class="header-btn" title="Shop Interior">🛒</button>
                <button id="interiorEditBtn" class="header-btn" title="Edit Interior">🖼️</button>
                <button id="interiorDragBtn" class="header-btn" title="Drag Mode">✋</button>
            </div>
        </div>

        <!-- Items Section -->
        <div class="items-section">
            <h3>Cricker Items</h3>
            <div class="currency-display">
                <div class="gold-display">
                    <img src="assets/img/gold.png" alt="Gold" class="gold-icon">
                    <span id="goldAmountItems">0</span>
                </div>
                <div class="crush-display" style="margin-left:12px;">
                    <img src="assets/img/crushcoin2.png" alt="Crush Coin" class="crush-icon">
                    <span id="crushCoinAmountItems">0</span>
                </div>
            </div>
            <div id="itemsList" class="items-list"></div>
        </div>
        <!-- Boosts Section -->
        <div class="items-section">
            <h3>Auto Boosts</h3>
            <div class="currency-display">
                <div class="gold-display">
                    <img src="assets/img/gold.png" alt="Gold" class="gold-icon">
                    <span id="goldAmountBoosts">0</span>
                </div>
                <div class="crush-display" style="margin-left:12px;">
                    <img src="assets/img/crushcoin2.png" alt="Crush Coin" class="crush-icon">
                    <span id="crushCoinAmountBoosts">0</span>
                </div>
            </div>
            <div id="boostsList" class="items-list"></div>
        </div>

        <!-- Dialog Box -->
        <div id="dialogBox" class="dialog-box hidden">
            <div class="dialog-content">
                <div class="dialog-character">
                    <img id="dialogCharacterImg" src="" alt="">
                </div>
                <div class="dialog-text">
                    <div id="dialogText"></div>
                    <button id="dialogCloseBtn" class="dialog-close-btn">Continue</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Background Modal -->
    <div id="backgroundModal" class="modal">
        <div class="modal-content" style="max-width:700px;">
            <div class="modal-header">
                <h2>Choose Background</h2>
                <button class="close-btn" onclick="closeModal('backgroundModal')">&times;</button>
            </div>
            <div class="background-modal-content" style="padding:20px 0;">
                <div id="backgroundList" class="background-list"></div>
            </div>
        </div>
    </div>

    <!-- Exchange Modal -->
    <div id="exchangeModal" class="modal">
        <div class="modal-content" style="max-width:400px;">
            <div class="modal-header">
                <h2>Exchange Crush Coin</h2>
                <button class="close-btn" onclick="closeModal('exchangeModal')">&times;</button>
            </div>
            <div class="exchange-modal-content" style="padding:20px 0;">
                <div class="exchange-options">
                    <button class="exchange-btn" data-cc="100" data-gold="1000">100 Crush Coin → 1,000 Gold</button>
                    <button class="exchange-btn" data-cc="200" data-gold="2000">200 Crush Coin → 2,000 Gold</button>
                    <button class="exchange-btn" data-cc="500" data-gold="5500">500 Crush Coin → 5,500 Gold</button>
                </div>
                <div id="exchangeInfo" style="margin-top:18px; color:#ff6b9d; font-weight:600;"></div>
            </div>
        </div>
    </div>

    <!-- Shop Modal -->
    <div id="shopModal" class="modal">
        <div class="modal-content character-modal">
            <div class="modal-header">
                <h2>Shop Interior</h2>
                <button class="close-btn" onclick="closeModal('shopModal')">&times;</button>
            </div>
            <div class="character-modal-content">
                <div id="shopItemList" class="character-list">
                    <!-- Shop items will be populated by JS -->
                </div>
            </div>
        </div>
    </div>

    <!-- Interior Edit Modal -->
    <div id="interiorEditModal" class="modal">
        <div class="modal-content character-modal">
            <div class="modal-header">
                <h2>Edit Interior Items</h2>
                <button class="close-btn" onclick="closeModal('interiorEditModal')">&times;</button>
            </div>
            <div class="character-modal-content">
                <div class="interior-edit-info">
                    <p>Manage your interior items. Use the ✋ button to enter drag mode for repositioning.</p>
                </div>
                <div id="interiorItemList" class="interior-edit-list">
                    <!-- Interior items will be populated by JS -->
                </div>
            </div>
        </div>
    </div>

    <!-- Redeem Code Modal -->
    <div id="redeemCodeModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Redeem Code</h2>
                <button class="close-btn" onclick="closeModal('redeemCodeModal')">&times;</button>
            </div>
            <div class="redeem-content" style="padding: 24px 0 10px 0; text-align:center;">
                <input id="redeemCodeInput" type="text" maxlength="32" placeholder="Enter your code..." style="padding:10px 18px;font-size:1.1em;border-radius:8px;border:1.5px solid #ffb3d9;width:70%;max-width:320px;">
                <button id="submitRedeemCodeBtn" class="menu-btn" style="margin-left:12px;">Redeem</button>
                <div id="redeemCodeResult" style="margin-top:18px;font-weight:600;font-size:1.05em;"></div>
            </div>
        </div>
    </div>

    <script src="html2canvas.min.js"></script>
    <script src="jspdf.umd.min.js"></script>
   <!-- <script src="script.js"></script> -->
    <script src="https://jurnaldemo.ct.ws/game/mycrush/api.js"></script>
</body>
</html> 
