//
//  PlanScene.swift
//  JJGame
//
//  Created by zhangshumeng on 2022/3/29.
//

import UIKit
import SpriteKit
import GameplayKit

class PlanScene: SKScene {
    
    // 创建子弹的定时器
    private var bulletTimer: Timer?
    // 创建敌人/生命/攻击力的定时器
    private var enemyTimer: Timer?
    // 创建boss的定时器
    private var bossTimer: Timer?
    // 创建boss的定时器
    private var bossBulletTimer: Timer?
    private var bossNode: SKSpriteNode?
    private var bossLifeNode: SKLabelNode?
    // 移动的是否是飞机
    private var isTouchPlan: Bool = false
    // 当前飞机的point
    private var planPoint: CGPoint = .zero
    // 敌机的生命力
    private var enemyLife: Int = 10
    // 飞机的攻击力
    private var aggressivity: Int = 10
    // 等级 1~6
    private var leve: Int = 1 {
        didSet {
            leveLabel.text = "当前关卡: \(leve)"
        }
    }
    // 得分
    private var score: Int = 0 {
        didSet {
            scoreLabel.text = "得分: \(score)"
        }
    }
    // 自己生命
    private var ownLife: Int = 3 {
        didSet {
            lifeLabel.text = "生命 x \(ownLife)"
        }
    }
    // boss血量
    private var bossLife: Int = 1000
    
    private lazy var bgNode1: SKSpriteNode = {
        let view = SKSpriteNode(imageNamed: "plan_bg")
        view.position = CGPoint(x: 0, y: 0)
        view.size = size
        view.anchorPoint = CGPoint(x: 0, y: 0)
        view.zPosition = 0
        view.name = "bgNode"
        return view
    }()
    private lazy var bgNode2: SKSpriteNode = {
        let view = SKSpriteNode(imageNamed: "plan_bg")
        view.position = CGPoint(x: 0, y: size.height)
        view.size = size
        view.anchorPoint = CGPoint(x: 0, y: 0)
        view.zPosition = 0
        view.name = "bgNode"
        return view
    }()
    
    private lazy var backNode: SKSpriteNode = {
        let view = SKSpriteNode(imageNamed: "back")
        view.position = CGPoint(x: 30, y: size.height - 30)
        view.anchorPoint = CGPoint(x: 0.5, y: 0.5)
        view.size = CGSize(width: 30, height: 30)
        view.zPosition = 1
        view.name = "back"
        return view
    }()
    
    private lazy var leveLabel: SKLabelNode = {
        let view = SKLabelNode(text: "当前关卡: 1")
        view.fontSize = 15
        view.fontColor = .white
        view.position = CGPoint(x: size.width - 15, y: size.height - 30)
        view.zPosition = 1
        view.horizontalAlignmentMode = .right
        return view
    }()
    
    private lazy var scoreLabel: SKLabelNode = {
        let view = SKLabelNode(text: "得分: 0")
        view.fontSize = 15
        view.fontColor = .white
        view.position = CGPoint(x: size.width - 15, y: size.height - 50)
        view.zPosition = 1
        view.horizontalAlignmentMode = .right
        return view
    }()
    
    private lazy var lifeLabel: SKLabelNode = {
        let view = SKLabelNode(text: "生命 x 3")
        view.fontSize = 15
        view.fontColor = .white
        view.position = CGPoint(x: size.width - 15, y: size.height - 70)
        view.zPosition = 1
        view.horizontalAlignmentMode = .right
        return view
    }()
    
    // 飞机
    private lazy var planNode: SKSpriteNode = {
        let view = SKSpriteNode(imageNamed: "plan02")
        view.position = CGPoint(x: size.width / 2, y: size.height / 2)
        view.anchorPoint = CGPoint(x: 0.5, y: 0.5)
        view.size = CGSize(width: 70, height: 54)
        view.zPosition = 2
        view.name = "plan"
        view.physicsBody = SKPhysicsBody(rectangleOf: view.size)
        //物理体是否受力
        view.physicsBody?.isDynamic = false
        //设置物理体的标识符
        view.physicsBody?.categoryBitMask = 1
        //设置可与哪一类的物理体发生碰撞
        view.physicsBody?.contactTestBitMask = 2
        return view
    }()
    
    override init(size: CGSize) {
        super.init(size: size)
        backgroundColor = .black
        //设置重力加速度
        physicsWorld.gravity = .zero
        physicsWorld.contactDelegate = self
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func didMove(to view: SKView) {
        super.didMove(to: view)
        
        addChild(bgNode1)
        addChild(bgNode2)
        addChild(backNode)
        addChild(leveLabel)
        addChild(scoreLabel)
        addChild(lifeLabel)
        addChild(planNode)
        planPoint = CGPoint(x: size.width / 2, y: size.height / 2)
        addPanGestureRecognizer(view)
        addTimer()
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        isTouchPlan = false
        guard let touch = (touches as NSSet).anyObject() as? UITouch else { return }
        let point = touch.location(in: self)
        let node = atPoint(point)
        switch node.name {
        case "plan":
            // 如果点击的是飞机，则将isTouchPlan置为true
            isTouchPlan = true
        case "back":
            view?.presentScene(MenuScene(size: size), transition: .fade(withDuration: 0.5))
        case "oncemore":
            let planScene = PlanScene(size: size)
            planScene.scaleMode = .aspectFill
            view?.presentScene(planScene, transition: .doorway(withDuration: 0.5))
        default:
            break
        }
    }
    
    override func update(_ currentTime: TimeInterval) {
        super.update(currentTime)
        
        backgroudScrollUpdate()
    }
    
    // 让背景动起来
    private func backgroudScrollUpdate() {
        bgNode1.position = CGPoint(x: bgNode1.position.x, y: bgNode1.position.y - 4)
        bgNode2.position = CGPoint(x: bgNode2.position.x, y: bgNode2.position.y - 4)
        if bgNode1.position.y <= -size.height {
            bgNode1.position = CGPoint(x: 0, y: 0)
            bgNode2.position = CGPoint(x: 0, y: size.height)
        }
    }
}

extension PlanScene {
    
    private func gameOver() {
        stopTimer()
        let tipsLabel = SKLabelNode(text: "游戏结束")
        tipsLabel.fontSize = 40
        tipsLabel.fontColor = .white
        tipsLabel.horizontalAlignmentMode = .center
        tipsLabel.position = CGPoint(x: size.width/2, y: size.height/2 + 100)
        tipsLabel.zPosition = 2
        addChild(tipsLabel)
        
        let levelLabel = SKLabelNode(text: "最终关卡: \(leve)")
        levelLabel.fontSize = 20
        levelLabel.fontColor = .white
        levelLabel.horizontalAlignmentMode = .center
        levelLabel.position = CGPoint(x: size.width/2, y: size.height/2 + 60)
        levelLabel.zPosition = 2
        addChild(levelLabel)
        
        let scoreLabel = SKLabelNode(text: "得分: \(score)")
        scoreLabel.fontSize = 20
        scoreLabel.fontColor = .white
        scoreLabel.horizontalAlignmentMode = .center
        scoreLabel.position = CGPoint(x: size.width/2, y: size.height/2 + 30)
        scoreLabel.zPosition = 2
        addChild(scoreLabel)
        
        let oncemoreNode = SKSpriteNode(imageNamed: "oncemore")
        oncemoreNode.position = CGPoint(x: size.width/2, y: size.height/2 - 20)
        oncemoreNode.anchorPoint = CGPoint(x: 0.5, y: 0.5)
        oncemoreNode.size = CGSize(width: 121, height: 54)
        oncemoreNode.zPosition = 2
        oncemoreNode.name = "oncemore"
        addChild(oncemoreNode)
    }
}

extension PlanScene {
    
    private func addPanGestureRecognizer(_ view: SKView) {
        // 给当前场景的view添加pan手势，因为想要拖动飞机，SKSpriteNode是不能添加手势的，所以,我们要把手势添加到当前场景的view上，然后在touchesBegan方法里判断当前触摸的是不是飞机
        let pan = UIPanGestureRecognizer(target: self, action: #selector(panAction(_:)))
        view.addGestureRecognizer(pan)
    }
    
    private func addTimer() {
        startEnemyTimer()
        startBulletTimer()
        startBossTimer()
    }
    
    // 敌机定时器
    private func startEnemyTimer() {
        var ti = 0.5 - TimeInterval(leve) * 0.05
        if ti <= 0.1 {
            ti = 0.1
        }
        enemyTimer = Timer.scheduledTimer(timeInterval: ti, target: self, selector: #selector(createEnemy), userInfo: nil, repeats: true)
        // 添加攻击武器和生命
        createPotionOrAttack()
    }
    
    // 子弹定时器
    private func startBulletTimer() {
        stopBulletTimer()
        var ti = 0.2 - TimeInterval(leve) * 0.02
        if ti <= 0.05 {
            ti = 0.05
        }
        bulletTimer = Timer.scheduledTimer(timeInterval: ti, target: self, selector: #selector(createBullet), userInfo: nil, repeats: true)
    }
    
    // boss出现定时器
    private func startBossTimer() {
        bossTimer = Timer.scheduledTimer(timeInterval: 60, target: self, selector: #selector(createBoss), userInfo: nil, repeats: true)
    }
    
    // boss发射子弹定时器
    private func startBossBulletTimer() {
        var ti = 1 - TimeInterval(leve) * 0.05
        if ti <= 0.1 {
            ti = 0.1
        }
        bossBulletTimer = Timer.scheduledTimer(timeInterval: ti, target: self, selector: #selector(createBossBullet), userInfo: nil, repeats: true)
    }
    
    private func stopTimer() {
        stopEnemyTimer()
        stopBulletTimer()
        stopBossTimer()
        stopBossBulletTimer()
    }
    
    private func stopEnemyTimer() {
        if let _ = enemyTimer {
            enemyTimer?.invalidate()
            enemyTimer = nil
        }
    }
    
    private func stopBulletTimer() {
        if let _ = bulletTimer {
            bulletTimer?.invalidate()
            bulletTimer = nil
        }
    }
    
    private func stopBossTimer() {
        if let _ = bossTimer {
            bossTimer?.invalidate()
            bossTimer = nil
        }
    }
    
    private func stopBossBulletTimer() {
        if let _ = bossBulletTimer {
            bossBulletTimer?.invalidate()
            bossBulletTimer = nil
        }
    }
}

extension PlanScene {
    
    @objc private func panAction(_ sender: UIPanGestureRecognizer) {
        if isTouchPlan {
            var position = sender.location(in: sender.view)
            // 因为SpriteKit的坐标原点在左下角，所以需要转换一下
            position = CGPoint(x: position.x, y: size.height - position.y)
            planNode.position = position
            planPoint = position
        }
    }
    
    private func createPotionOrAttack() {
        // 创建药水
        DispatchQueue.main.asyncAfter(deadline: .now() + TimeInterval(arc4random_uniform(60))) {
            self.createNode("plan_potion")
        }
        // 增加攻击力
        DispatchQueue.main.asyncAfter(deadline: .now() + TimeInterval(arc4random_uniform(60))) {
            self.createNode("plan_attack")
        }
    }
    
    private func createNode(_ name: String) {
        let node = SKSpriteNode(imageNamed: name)
        let pointX = CGFloat(arc4random_uniform(UInt32(self.size.width - 40)))
        node.position = CGPoint(x: pointX + 20, y: self.size.height)
        node.anchorPoint = CGPoint(x: 0.5, y: 0.5)
        node.size = CGSize(width: 40, height: 40)
        node.zPosition = 1
        node.name = name
        self.addChild(node)
        var ti = 6 - TimeInterval(leve) * 0.3
        if ti <= 1 {
            ti = 1
        }
        node.run(SKAction.moveTo(y: 0, duration: ti)) {
            node.removeAllActions()
            node.removeFromParent()
        }
        
        node.physicsBody = SKPhysicsBody(rectangleOf: node.size)
        //物理体是否受力
        node.physicsBody?.isDynamic = true
        node.physicsBody?.allowsRotation = false
        //设置物理体的标识符
        node.physicsBody?.categoryBitMask = 2
        //设置可与哪一类的物理体发生碰撞
        node.physicsBody?.contactTestBitMask = 1
        node.physicsBody?.collisionBitMask = 0
    }
    
    // 创建敌机
    @objc private func createEnemy() {
        let enemyNode = SKSpriteNode(imageNamed: "plan01")
        let pointX = CGFloat(arc4random_uniform(UInt32(size.width - 40)))
        enemyNode.position = CGPoint(x: pointX + 20, y: size.height)
        enemyNode.anchorPoint = CGPoint(x: 0.5, y: 0.5)
        enemyNode.size = CGSize(width: 40, height: 40)
        enemyNode.zPosition = 1
        enemyNode.name = "enemy"
        addChild(enemyNode)
        var ti = 6 - TimeInterval(leve) * 0.3
        if ti <= 1 {
            ti = 1
        }
        enemyNode.run(SKAction.moveTo(y: 0, duration: ti)) {
            enemyNode.removeAllActions()
            enemyNode.removeFromParent()
        }
        
        enemyNode.physicsBody = SKPhysicsBody(rectangleOf: enemyNode.size)
        //物理体是否受力
        enemyNode.physicsBody?.isDynamic = true
        enemyNode.physicsBody?.allowsRotation = false
        //设置物理体的标识符
        enemyNode.physicsBody?.categoryBitMask = 2
        //设置可与哪一类的物理体发生碰撞
        enemyNode.physicsBody?.contactTestBitMask = 1
        enemyNode.physicsBody?.collisionBitMask = 0
        enemyNode.physicsBody?.mass = CGFloat(enemyLife)
    }
    
    // 创建子弹
    @objc private func createBullet() {
        let bulletNode = SKSpriteNode(imageNamed: "plan_bullet")
        bulletNode.position = planPoint
        bulletNode.anchorPoint = CGPoint(x: 0.5, y: 1)
        bulletNode.size = CGSize(width: 10, height: 10)
        bulletNode.zPosition = 1
        bulletNode.name = "bullet"
        addChild(bulletNode)
        var ti = 3 - TimeInterval(leve) * 0.5
        if ti <= 0.5 {
            ti = 0.5
        }
        bulletNode.run(SKAction.moveTo(y: size.height, duration: ti)) {
            bulletNode.removeAllActions()
            bulletNode.removeFromParent()
        }
        
        bulletNode.physicsBody = SKPhysicsBody(rectangleOf: bulletNode.size)
        //物理体是否受力
        bulletNode.physicsBody?.isDynamic = true
        bulletNode.physicsBody?.allowsRotation = false
        bulletNode.physicsBody?.collisionBitMask = 0
        //设置物理体的标识符
        bulletNode.physicsBody?.categoryBitMask = 1
        //设置可与哪一类的物理体发生碰撞
        bulletNode.physicsBody?.contactTestBitMask = 2
    }
    
    // 创建boss
    @objc private func createBoss() {
        bossNode = SKSpriteNode(imageNamed: "boss01")
        bossNode?.position = CGPoint(x: size.width / 2, y: size.height - 50)
        bossNode?.anchorPoint = CGPoint(x: 0.5, y: 1)
        bossNode?.size = CGSize(width: 98, height: 127)
        bossNode?.zPosition = 1
        bossNode?.name = "boss"
        addChild(bossNode!)
        
        let wait = SKAction.wait(forDuration: 2)
        let action1 = SKAction.moveTo(x: 64, duration: 1.5)
        let action2 = SKAction.moveTo(x: size.width - 64, duration: 3)
        bossNode?.run(wait) {
            self.bossNode?.run(SKAction.repeatForever(SKAction.sequence([action1, action2])))
        }
        
        bossNode?.physicsBody = SKPhysicsBody(rectangleOf: bossNode?.size ?? .zero)
        //物理体是否受力
        bossNode?.physicsBody?.isDynamic = true
        bossNode?.physicsBody?.allowsRotation = false
        //设置物理体的标识符
        bossNode?.physicsBody?.categoryBitMask = 2
        //设置可与哪一类的物理体发生碰撞
        bossNode?.physicsBody?.contactTestBitMask = 1
        bossNode?.physicsBody?.collisionBitMask = 0
        bossNode?.physicsBody?.mass = CGFloat(leve) * 1000
        
        // 生命值
        bossLife = leve * 1000
        bossLifeNode = SKLabelNode(text: "\(bossLife)/\(bossLife)")
        bossLifeNode?.fontColor = .green
        bossLifeNode?.fontSize = 20
        bossLifeNode?.position = bossNode?.position ?? .zero
        bossLifeNode?.horizontalAlignmentMode = .center
        bossLifeNode?.zPosition = 1
        addChild(bossLifeNode!)
        bossLifeNode?.run(SKAction.wait(forDuration: 2)) {
            self.bossLifeNode?.run(SKAction.repeatForever(SKAction.sequence([
                SKAction.moveTo(x: 64, duration: 1.5),
                SKAction.moveTo(x: self.size.width - 64, duration: 3)
            ])))
        }
        
        stopEnemyTimer()
        stopBossTimer()
        startBossBulletTimer()
    }
    
    // 创建boss Bullet
    @objc private func createBossBullet() {
        let bossBulletNode = SKSpriteNode(imageNamed: "boss_bullet")
        bossBulletNode.position = bossNode?.position ?? CGPoint(x: size.width / 2, y: size.height)
        bossBulletNode.anchorPoint = CGPoint(x: 0.5, y: 1)
        bossBulletNode.size = CGSize(width: 12, height: 25)
        bossBulletNode.zPosition = 1
        bossBulletNode.name = "bossBullet"
        addChild(bossBulletNode)
        var ti = 6 - TimeInterval(leve) * 0.3
        if ti <= 1 {
            ti = 1
        }
        bossBulletNode.run(SKAction.moveTo(y: 0, duration: ti)) {
            bossBulletNode.removeAllActions()
            bossBulletNode.removeFromParent()
        }
        
        bossBulletNode.physicsBody = SKPhysicsBody(rectangleOf: bossBulletNode.size)
        //物理体是否受力
        bossBulletNode.physicsBody?.isDynamic = true
        bossBulletNode.physicsBody?.allowsRotation = false
        //设置物理体的标识符
        bossBulletNode.physicsBody?.categoryBitMask = 2
        //设置可与哪一类的物理体发生碰撞
        bossBulletNode.physicsBody?.contactTestBitMask = 1
        bossBulletNode.physicsBody?.collisionBitMask = 0
    }
}

extension PlanScene: SKPhysicsContactDelegate {
    
    func didBegin(_ contact: SKPhysicsContact) {
        var planeNode: SKSpriteNode?
        var enemyNode: SKSpriteNode?
        if contact.bodyA.categoryBitMask == 1 && contact.bodyB.categoryBitMask == 2 {
            planeNode = contact.bodyA.node as? SKSpriteNode
            enemyNode = contact.bodyB.node as? SKSpriteNode
        } else {
            planeNode = contact.bodyB.node as? SKSpriteNode
            enemyNode = contact.bodyA.node as? SKSpriteNode
        }
        guard let planeNode = planeNode, let enemyNode = enemyNode else { return }
        // 增加生命
        if enemyNode.name == "plan_potion", planeNode.name == "plan" {
            ownLife += 1
            enemyNode.removeAllActions()
            enemyNode.removeFromParent()
            return
        }
        // 增加攻击力
        if enemyNode.name == "plan_attack", planeNode.name == "plan" {
            aggressivity += 10
            enemyNode.removeAllActions()
            enemyNode.removeFromParent()
            return
        }

        // 处理飞机
        switch planeNode.name {
        case "bullet" where (enemyNode.name != "bossBullet" &&
                             enemyNode.name != "plan_potion" &&
                             enemyNode.name != "plan_attack"):
            planeNode.removeAllActions()
            planeNode.removeFromParent()
            if enemyNode.name == "boss" {
                bossLife -= aggressivity
                bossLifeNode?.text = "\(bossLife)/\(leve*1000)"
                blast(CGPoint(x: enemyNode.position.x, y: enemyNode.position.y - 64), fileName: "Strike")
            }
        case "plan":
            ownLife -= 1
            if ownLife <= 0 {
                gameOver()
                blast(enemyNode.position, fileName: "Blast")
                planeNode.removeAllActions()
                planeNode.removeFromParent()
            }
        default:
            break
        }
        
        // 如果是boss发射的子弹，则不做处理
        if enemyNode.name == "bossBullet" {
            return
        }
        if enemyNode.name == "plan_potion" {
            return
        }
        if enemyNode.name == "plan_attack" {
            return
        }
        
        enemyNode.physicsBody?.mass -= CGFloat(aggressivity)
        
        if enemyNode.physicsBody?.mass ?? 0 <= CGFloat(aggressivity) {
            enemyNode.removeAllActions()
            enemyNode.removeFromParent()
            switch enemyNode.name {
            case "enemy":
                score += enemyLife
            case "boss":
                score += leve * 1000
                leve += 1
                enemyLife += leve * 10
                stopBossBulletTimer()
                bossNode?.removeAllActions()
                bossNode?.removeFromParent()
                bossLifeNode?.removeAllActions()
                bossLifeNode?.removeFromParent()
                
                startBulletTimer()
                startEnemyTimer()
                startBossTimer()
            default:
                break
            }
            
            // 敌机销毁的粒子效果 Particle
            blast(enemyNode.position, fileName: "Blast")
        }
    }
    
    private func blast(_ position: CGPoint, fileName: String) {
        if let blast = SKEmitterNode(fileNamed: fileName) {
            blast.zPosition = 2
            blast.position = position
            addChild(blast)
            blast.run(SKAction.sequence([
                SKAction.wait(forDuration: 0.3),
                SKAction.run {
                    blast.removeAllActions()
                    blast.removeFromParent()
                }
            ]))
        }
    }
}
