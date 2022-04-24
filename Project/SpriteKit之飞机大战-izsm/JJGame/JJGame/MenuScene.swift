//
//  MenuScene.swift
//  JJGame
//
//  Created by zhangshumeng on 2022/3/29.
//

import UIKit
import SpriteKit
import GameplayKit

class MenuScene: SKScene {

    override init(size: CGSize) {
        super.init(size: size)
        
        backgroundColor = .black
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func didMove(to view: SKView) {
        super.didMove(to: view)
        
        // 飞机大战
        let planNode = SKSpriteNode(imageNamed: "plan_icon")
        planNode.color = .white
        planNode.position = CGPoint(x: size.width / 2, y: size.height / 2)
        planNode.anchorPoint = CGPoint(x: 0.5, y: 0.5)
        planNode.size = CGSize(width: 100, height: 100)
        planNode.zPosition = 1
        planNode.name = "plan"
        addChild(planNode)
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touch = (touches as NSSet).anyObject() as? UITouch else { return }
        let point = touch.location(in: self)
        let node = atPoint(point)
        
        switch node.name {
        case "plan":
            let planScene = PlanScene(size: size)
            planScene.scaleMode = .aspectFill
            view?.presentScene(planScene, transition: .doorway(withDuration: 0.5))
        default:
            break
        }
    }
}
