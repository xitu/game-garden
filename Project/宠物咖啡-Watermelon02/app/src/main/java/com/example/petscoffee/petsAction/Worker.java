package com.example.petscoffee.petsAction;

import com.example.petscoffee.bean.CoffeeShop;
import com.example.petscoffee.bean.pets.Pets;

import java.util.ArrayList;
import java.util.Random;

public class Worker {//获取每个宠物的工作结果
    private CoffeeShop coffee;
    private float fee;// 营业额
    private Random random = new Random(System.currentTimeMillis());
    private ArrayList<String> process = new ArrayList<>();//字符串，用来存储宠物在营业中的经历
    private ArrayList<String> bill = new ArrayList<>();//存储宠物收入字符串，用于输出到营业结果界面
    private float income;//该宠物带来的收入

    public Worker(CoffeeShop coffee) {//传入CoffeeShop实例和工作的宠物的序号
        // 传入Service以保存
        this.coffee = coffee;
        for (Pets pet : coffee.getPets()){
            work(pet);
        }
    }

    public Worker work(Pets pet) {
        if (pet.getHunger() > 0) {// 饥饿度不为0
            int roll = random.nextInt(20);// 随机事件值
            if (roll == 0) {// 被乱rua事件
                pet.setMood(-1);
                fee = (pet.getLoveliness() * 2) - ((10f - (float) pet.getCleanliness()) / 5) - ((10f - (float) pet.getMood()) / 10);
                // 营业额=（可爱度x2 -(不清洁度/5)-（不好心情/10））
                setProcess(pet.getName() + "被粗暴的客人狠狠地rua来rua去，心情值-2 o(≧口≦)o\n");
            } else if (roll == 1) {// 被弄脏事件
                pet.setCleanliness(-1);
                fee = (pet.getLoveliness() * 2) - ((10f - (float) pet.getCleanliness()) / 5) - ((10f - (float) pet.getMood()) / 10);
                setProcess(pet.getName() + "上蹿下跳地玩耍弄得自己一身灰尘，清洁度-2 (* ~︿~)\n");
            } else if (roll == 2) {//扣钱事件
                fee = -30;
                setProcess(pet.getName() + "打翻了客人的饮品,为客人进行了赔偿，钱钱-30 (艹皿艹 )\n");
            } else if (roll < 18) {// 安稳地在某个地点度过事件
                fee = (pet.getLoveliness() * 2) - ((10f - (float) pet.getCleanliness()) / 5) - ((10f - (float) pet.getMood()) / 10);
                setProcess(pet.getName() + "在" + getPlace() + "渡过了懒散的一段时光 ( >ρ < ”)\n");
            } else if (roll == 18) {//额外收入事件
                fee = (pet.getLoveliness() * 3) - ((10f - (float) pet.getCleanliness()) / 5) - ((10f - (float) pet.getMood()) / 10);
                setProcess(pet.getName() + "遇见了慷慨的客人，获得额外收入 ¥v¥\n");
            } else {//增加心情事件
                if ((float) pet.getMood() < 10) {
                    pet.setMood(1);
                    fee = (pet.getLoveliness() * 2) - ((10 - (float) pet.getCleanliness()) / 5) - ((10 - (float) pet.getMood()) / 10);
                    setProcess(pet.getName() + "今天运气满满，心情+1 (๑•̀ㅂ•́)و✧\n");
                } else {
                    fee = (pet.getLoveliness() * 2) - ((10 - (float) pet.getCleanliness()) / 5) - ((10 - (float) pet.getMood()) / 10);
                    setProcess(pet.getName() + "今天运气满满，心情大好 (๑•̀ㅂ•́)و✧\n");
                }
            }
        }

        float extra = random.nextInt() % 3;// 随机收入浮动值
        setBill(pet.getName() + "为你带来了$" + (fee + extra) + "收入\n");
        setIncome(extra + fee);
        return this;
    }

    public String getPlace() {// 获取随机地点方法
        int place;
        String str = "test";
        Random r = new Random();
        place = r.nextInt(10);
        switch (place) {
            case 0:
                str = "阳台";
                break;
            case 1:
                str = "沙发上";
                break;
            case 2:
                str = "桌子上";
                break;
            case 3:
                str = "桌子下";
                break;
            case 4:
                str = "楼梯上";
                break;
            case 5:
                str = "墙边";
                break;
            case 6:
                str = "吧台";
                break;
            case 7:
                str = "橱窗";
                break;
            case 8:
                str = "门口";
                break;
            case 9:
                str = "房檐下";
                break;
        }
        return str;

    }

    public void setBill(String bill) {
        this.bill.add(bill);
    }

    public void setProcess(String process) {
        this.process.add(process);
    }

    public void setIncome(float income) {
        this.income = income;
    }

    public ArrayList<String> getBill() {
        return bill;
    }

    public ArrayList<String> getProcess() {
        return process;
    }

    public float getIncome() {
        return income;
    }
}


