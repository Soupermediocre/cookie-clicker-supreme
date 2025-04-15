namespace SpriteKind {
    export const Text = SpriteKind.create()
    export const Building = SpriteKind.create()
}
namespace StatusBarKind {
    export const stats = StatusBarKind.create()
}
function SpawnClicker () {
    Clicker = sprites.create(assets.image`myImage0`, SpriteKind.Building)
    Clicker.setPosition(262, 116)
    BuildingStats = statusbars.create(20, 4, StatusBarKind.stats)
    BuildingStats.setFlag(SpriteFlag.Invisible, true)
    BuildingStats.attachToSprite(Clicker)
    BuildingStats.value = 0
    BuildingStats.max = 10
}
function SpawnGrandma () {
    Grandma = sprites.create(assets.image`grandma`, SpriteKind.Building)
    Grandma.setPosition(262, 148)
    BuildingStats = statusbars.create(20, 4, StatusBarKind.stats)
    BuildingStats.setFlag(SpriteFlag.Invisible, true)
    BuildingStats.attachToSprite(Grandma)
    BuildingStats.max = 100
    BuildingStats.value = 0
}
function SpawnFarm () {
    Farm = sprites.create(assets.image`myImage1`, SpriteKind.Building)
    Farm.setPosition(262, 180)
    BuildingStats = statusbars.create(20, 4, StatusBarKind.stats)
    BuildingStats.setFlag(SpriteFlag.Invisible, true)
    BuildingStats.attachToSprite(Farm)
    BuildingStats.max = 1100
    BuildingStats.value = 0
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (Cursor.overlapsWith(Cookie)) {
        Cookies += 1000
        Cookie.setImage(assets.image`myImage`)
        CookieSizeInflucton()
    }
    for (let index = 0; index <= sprites.allOfKind(SpriteKind.Building).length; index++) {
        SelectedBuilding = sprites.allOfKind(SpriteKind.Building).shift()
        if (Cursor.overlapsWith(SelectedBuilding)) {
            if (Cookies >= statusbars.getStatusBarAttachedTo(StatusBarKind.stats, SelectedBuilding).max) {
                Cookies += statusbars.getStatusBarAttachedTo(StatusBarKind.stats, SelectedBuilding).max * -1
                statusbars.getStatusBarAttachedTo(StatusBarKind.stats, SelectedBuilding).max = Math.round(statusbars.getStatusBarAttachedTo(StatusBarKind.stats, SelectedBuilding).max * 1.15)
                statusbars.getStatusBarAttachedTo(StatusBarKind.stats, SelectedBuilding).value += 1
            }
        }
    }
})
function Abbreviate (Number2: number) {
    if (Number2 >= 1000) {
        NumbDisplay = "" + spriteutils.roundWithPrecision(Number2 / 1000, 1) + "K"
    }
    if (Number2 >= 1000000) {
        NumbDisplay = "" + spriteutils.roundWithPrecision(Number2 / 1000000, 1) + "M"
    }
    return NumbDisplay
}
function CookieSizeInflucton () {
    for (let index = 0; index < 8; index++) {
        Cookie.changeScale(0.02, ScaleAnchor.Middle)
        pause(2)
    }
    for (let index = 0; index < 16; index++) {
        Cookie.changeScale(-0.02, ScaleAnchor.Middle)
        pause(2)
    }
    Cookie.setScale(1, ScaleAnchor.Middle)
}
browserEvents.onMouseMove(function (x, y) {
    Cursor.setPosition(x, y)
})
function SpawnMine () {
    Mine = sprites.create(assets.image`myImage2`, SpriteKind.Building)
    Mine.setPosition(262, 212)
    BuildingStats = statusbars.create(20, 4, StatusBarKind.stats)
    BuildingStats.setFlag(SpriteFlag.Invisible, true)
    BuildingStats.attachToSprite(Mine)
    BuildingStats.max = 12000
    BuildingStats.value = 0
}
let Mine: Sprite = null
let NumbDisplay = ""
let SelectedBuilding: Sprite = null
let Cookies = 0
let Farm: Sprite = null
let Grandma: Sprite = null
let BuildingStats: StatusBarSprite = null
let Clicker: Sprite = null
let Cookie: Sprite = null
let Cursor: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
scene.setBackgroundColor(6)
Cursor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 3 3 . . . . . . . 
    . . . . . . . 3 3 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Cursor.setFlag(SpriteFlag.Invisible, true)
Cookie = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
Cookie.setPosition(70, 70)
let CookieDisplay = sprites.create(img`
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    `, SpriteKind.Player)
CookieDisplay.setPosition(40, 20)
SpawnClicker()
SpawnGrandma()
SpawnFarm()
SpawnMine()
game.onUpdateInterval(1000, function () {
    let OwnedFarms = 0
    let OwnedGrandmas = 0
    Cookies += OwnedGrandmas
    Cookies += OwnedFarms * 10
})
// constantly resets the text for most sprites with text printed onto them and resets it, this is so the new and old prints do not overlap
forever(function () {
    if (Clicker) {
        Clicker.setImage(assets.image`myImage0`)
        images.print(Clicker.image, "Price: " + Abbreviate(statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Clicker).max), 30, 3, 0)
        images.print(Clicker.image, "Owned: " + statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Clicker).value, 31, 15, 0)
    }
    if (true) {
        Grandma.setImage(assets.image`grandma`)
        images.print(Grandma.image, "Price: " + Abbreviate(statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Grandma).max), 30, 3, 0)
        images.print(Grandma.image, "Owned: " + statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Grandma).value, 31, 15, 0)
    }
    if (Farm) {
        Farm.setImage(assets.image`myImage1`)
        images.print(Farm.image, "Price: " + Abbreviate(statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Farm).max), 30, 3, 0)
        images.print(Farm.image, "Owned: " + statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Farm).value, 31, 15, 0)
    }
    if (Mine) {
        let OwnedMines = 0
        let MinePrice = 0
        Mine.setImage(assets.image`myImage2`)
        images.print(Mine.image, "Price: " + Abbreviate(MinePrice), 30, 3, 0)
        images.print(Mine.image, "Owned: " + OwnedMines, 31, 15, 0)
    }
})
forever(function () {
    CookieDisplay.setImage(img`
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        ................................................................................................................................
        `)
    images.printCenter(CookieDisplay.image, "Cookies:" + " " + Cookies, 0, 0)
})
game.onUpdateInterval(10000, function () {
    Cookies += statusbars.getStatusBarAttachedTo(StatusBarKind.stats, Clicker).max
})
