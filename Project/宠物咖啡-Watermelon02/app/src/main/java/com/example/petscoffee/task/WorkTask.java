package com.example.petscoffee.task;

import android.app.Service;
import android.os.AsyncTask;

import com.example.petscoffee.petsAction.Worker;
import com.example.petscoffee.bean.CoffeeShop;
import com.example.petscoffee.repository.ArchiveRepository;
import com.example.petscoffee.listener.WorkListener;

import java.util.ArrayList;

public class WorkTask extends AsyncTask<Integer, Integer, Integer> {
    private WorkListener listener;
    private CoffeeShop coffee;
    private Service service;
    private final static int TYPE_SUCCESS = 0;
    private final static int TYPE_PAUSE = 1;

    public WorkTask(Service service, WorkListener listener) {
        this.listener = listener;
        ArchiveRepository.loadCoffee(coffeeShop -> {coffee = coffeeShop;
            return null;
        });
        this.service = service;
    }

    @Override
    protected void onPostExecute(Integer integer) {
        super.onPostExecute(integer);
        switch (integer) {
            case TYPE_SUCCESS:
                float money = 0;
                ArrayList<String> process;
                ArrayList<String> bill;
                try {
                    Worker worker = new Worker(coffee);
                    process = worker.getProcess();//process字符串，用来存储宠物在营业中的经历
                    bill = worker.getBill(); //bill存储宠物收入字符串，用于输出到营业结果界面
                    coffee.setMoney(worker.getIncome()+coffee.getMoney());//该宠物带来的收入
                    coffee.timeChange();
                    ArchiveRepository.saveCoffee(coffee);
                    listener.onSuccess(money, process, bill);//获取工作结果
                }catch (Exception e){
                    e.printStackTrace();
                }

                break;
            case TYPE_PAUSE:
        }
    }

    @Override
    protected void onProgressUpdate(Integer... values) {
        super.onProgressUpdate(values);
        int progress = values[0];
        listener.onProgress(progress);//调用Listener中的方法
    }

    protected Integer doInBackground(Integer... integers) {
        int progress = 0;
        while (progress < 100) {
            try {
                Thread.sleep(1000);//设置营业所需时间
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            progress += 5;
            publishProgress(progress);
        }
        return TYPE_SUCCESS;
    }
}
