
interface PlayerOptions {
  userInfo?: UserInfo
}

interface UserInfo {
  nickName: string
  headimage: string
}

export default class Player extends PIXI.Container {
  _score: number = 0
  _options: PlayerOptions
  _userInfo: UserInfo
  _isEmpty: boolean = true

  constructor(options: PlayerOptions) {
    super()
    this._options = options
    if (options.userInfo) {
      this._isEmpty = false
    }

    this.init()
  }

  /**
   * 设置分数
   * @param score 
   */
  public setScore(score) {
    this._score = score
  }

  /**
   * 获取分数
   * @returns 
   */
  public getScore(): number {
    return this._score
  }
  /**
   * 分数累加，并返回结果
   * @param score 
   * @returns 
   */
  public addScore(score: number = 0): number {
    this._score += score
    return this._score
  }

  public setUserInfo() {

  }

  public init() {
    if (this._isEmpty) {
      const bg = pixiUtil.genSprite('inviteUser')
      const invite = new PIXI.Text('邀请', {
        fontFamily: wx.$store.font,
        fontSize: 40,
        fill: "black",
      })
      this.addChild(bg, invite)
      // invite.x = this.width / 2
      // invite.y = this.height + 40
    } else {

      const avatar = PIXI.Sprite.from(this._userInfo.headimage)
      const name = new PIXI.Text(this._userInfo.nickName, {
        fontFamily: wx.$store.font,
        fontSize: 12,
        fill: "black",
      });
      
      this.addChild(avatar, name)

      const score = new PIXI.Text(String(this._score), {
        fontFamily: wx.$store.font,
        fontSize: 12,
        fill: "black",
      });
      this.addChild(score)
    }
  }

}