
interface PlayerOptions {
  userInfo?: UserInfo
}

interface UserInfo {
  nickName: string
  headimage: string
}

export default class Player extends PIXI.Container {
  #score: number = 0
  #options: PlayerOptions
  #userInfo: UserInfo
  #isEmpty: boolean = true

  constructor(options: PlayerOptions) {
    super()
    this.#options = options
    if (options.userInfo) {
      this.#isEmpty = false
    }

    this.init()
  }

  /**
   * 设置分数
   * @param score 
   */
  public setScore(score) {
    this.#score = score
  }

  /**
   * 获取分数
   * @returns 
   */
  public getScore(): number {
    return this.#score
  }
  /**
   * 分数累加，并返回结果
   * @param score 
   * @returns 
   */
  public addScore(score: number = 0): number {
    this.#score += score
    return this.#score
  }

  public setUserInfo() {

  }

  public init() {
    if (this.#isEmpty) {
      const bg = pixiUtil.genSprite('inviteUser')
      this.addChild(bg)
    } else {

      const bg = PIXI.Sprite.from(this.#userInfo.headimage)
      this.addChild(bg)
      const name = new PIXI.Text(this.#userInfo.nickName, {
        fontFamily: wx.$store.font,
        fontSize: 12,
        fill: "black",
      });
      
      this.addChild(name)

      const score = new PIXI.Text(String(this.#score), {
        fontFamily: wx.$store.font,
        fontSize: 12,
        fill: "black",
      });
      this.addChild(score)
    }
  }

}