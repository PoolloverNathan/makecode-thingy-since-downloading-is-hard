let playerCanMove = true
let playerCanJump = false
let level = -1
const player = sprites.create(assets.image`player`, SpriteKind.Player)
scene.cameraFollowSprite(player)
// controller.moveSprite(player)
scene.setBackgroundColor(0x9)
const tmap = [
    tilemap`level0`
]
// tileUtil.connectMaps(tmap[0], tilemap2, MapConnectionKind.Door1)
// function advanceLevel() {
    level++
    player.setPosition(0, 0)
    tiles.setCurrentTilemap(tmap[level])
// }
// advanceLevel()
forever(() => {
    if (controller.player1.isPressed(ControllerButton.Right)) impulse(player, "x", 2, 10)
    impulse(player, "y", -10, Infinity)
})

function impulse(sprite: Sprite, direction: "x" | "y", force: number, max: number) {
    console.log(`${sprite} impulse ${direction}: ${force} (max ${max}), v: ${sprite.vx},${sprite.vy}`)
    const key = <`vx` | `vy`>('v' + direction)
    const vDirection = Math.sign(sprite[key])
    const fDirection = Math.sign(force)
    const e = (f?: number): number => {
        const retval = f ? sprite[key] = f : sprite[key]
        console.log(`${sprite} e(${f || ''}) -> ${retval}`)
        return retval
    }
    switch (vDirection + '' + fDirection) {
        case '11':   // +v -- +f
            e(Math.max(e(), Math.min(e() + force, max)))
        break
        case '1-1':  // +v <> -f
            e(e() - force) // TODO: take max into account
        break
        case '-11':  // -v <> +f
            e(e() + force) // TODO: take max into account
        break
        case '-1-1': // -v -- -f
            e(Math.max(e(), Math.min(e() + force, max)))
        break
    }
}