package com.example.petscoffee.ui.activities;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.petscoffee.R;
import com.example.petscoffee.adapters.MsgAdapter;
import com.example.petscoffee.bean.Message;
import com.example.petscoffee.service.WorkService;

import java.util.ArrayList;

public class WorkActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {//通过绑定MessageAdapter的recyclerView来输出结果
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_work);
        RecyclerView recyclerView =  findViewById(R.id.work_recycler);
        String endData[] = getIntent().getStringExtra("endData").split("\n");
        ArrayList<Message> msgArray = new ArrayList<>();
        for (String data : endData) {
            msgArray.add(new Message(data, Message.LEFT_MSG));
        }
        recyclerView.setAdapter(new MsgAdapter(msgArray));
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    @Override
    public void onBackPressed() {//返回时回到主界面
        super.onBackPressed();
        stopService(new Intent(this,WorkService.class));//停止WorkService服务
        this.finish();
    }
}